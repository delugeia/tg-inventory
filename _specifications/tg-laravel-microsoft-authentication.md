# TG Laravel Microsoft Authentication Specification

**Status:** Selected architecture and implementation requirements  
**Documentation and released-source review:** September 30, 2026  
**Target:** Latest Laravel 13.x patch release, PHP 8.5, MariaDB 11.8

## 1. Overview

The application will authenticate Tabletop Gaymers (TG) members and registered, eligible guests through Microsoft Entra ID. Use **Laravel Socialite (`laravel/socialite`) with the Socialite Providers Microsoft adapter (`socialiteproviders/microsoft`)**. This selection is settled; implement normal Laravel integration without creating a custom authentication library or maintaining a private fork.

Microsoft handles credentials, MFA, and organizational sign-in policies. Socialite and the adapter handle the external authentication exchange. Laravel maintains the application's users, authorization rules, and browser sessions. MariaDB stores application records. This specification assumes a server-side Laravel web application with session cookies; a separate SPA, mobile client, or API authentication architecture requires additional design.

The Microsoft adapter is community-maintained, not a Microsoft SDK. See [Laravel Socialite](https://laravel.com/docs/13.x/socialite) and the [Microsoft adapter documentation](https://socialiteproviders.com/Microsoft/).

## 2. Requirements

| Area | Requirement |
| --- | --- |
| Framework and runtime | Laravel 13.x, PHP 8.5, MariaDB 11.8; use compatible stable package releases. |
| Audience | Register a single-tenant application in the TG workforce tenant. Configure the adapter with that tenant's GUID. |
| Eligible users | TG members and registered guests who meet the application's access policy. An arbitrary external Microsoft account is not sufficient. |
| Permissions | Request exactly `openid profile email User.Read` for this integration. `User.Read` is a delegated Microsoft Graph permission. |
| Flow | Server-side authorization code flow, PKCE enabled on redirect and callback, and session-based state checking retained. |
| Identity | Identify an external account by provider, TG tenant ID, and Microsoft object ID. Never use email as the identity key. |
| Local login | Connect the external identity to a local Laravel user and regenerate the session on successful login. |
| Authorization | Check eligibility before provisioning or signing in a user. Protect application routes with authentication and authorization checks. |
| Local passwords | Not offered in this TG application. Future applications may add local registration or additional Socialite providers independently. |
| Secrets | Private server configuration only; exclude credentials from Git, browser output, URLs, and logs. |

Single-tenant registration admits members and guests **of that tenant**; it does not by itself establish TG membership or application eligibility. Do not switch to `common` or `organizations` to accommodate invited guests. [Microsoft tenancy guidance](https://learn.microsoft.com/en-us/entra/identity-platform/single-and-multi-tenant-apps)

### Compatibility baseline

| Package reviewed | Release | Declared requirements relevant here |
| --- | --- | --- |
| [laravel/socialite](https://packagist.org/packages/laravel/socialite) | 5.31.0 | PHP `^8.1`; Laravel components include `^13.0`. |
| [socialiteproviders/microsoft](https://packagist.org/packages/socialiteproviders/microsoft) | 4.10.0 | PHP `^8.0`; provider manager `^4.4`; firebase/php-jwt `^7.0`. |
| [socialiteproviders/manager](https://packagist.org/packages/socialiteproviders/manager) | 4.10.0 | PHP `^8.3`; Laravel components `^12.0` or `^13.0`; Socialite `^5.29`. |

These declarations accommodate the target stack. Laravel documents support for MariaDB 10.3 and later. This is **documented compatibility**, not a completed installation or runtime test. Resolve the full dependency graph in the actual app and retain `composer.lock`. [Laravel database support](https://laravel.com/docs/13.x/database)

## 3. Accepted tradeoffs and boundaries

- **Graph profile access:** `User.Read` is accepted. The adapter's regular login flow obtains the signed-in user's profile through Graph; removing that permission alone does not remove this dependency. Profile retrieval adds a network dependency to login. No mail, calendar, directory-wide, or background access is requested.
- **Package ownership:** Laravel maintains Socialite; the community maintains the Microsoft adapter. Dependency updates and release review remain application maintenance responsibilities.
- **Validation qualifications:** The reviewed Microsoft 4.10.0 code checks ID-token signatures, issuer, and expiry, but uses substring audience matching and has no built-in nonce validation. Ordinary Microsoft application-ID GUIDs have equal length, limiting the practical audience concern. These observations do not demonstrate an exploitable vulnerability. A private validator or fork is not required by this specification. [Reviewed adapter source](https://github.com/SocialiteProviders/Microsoft/blob/4.10.0/Provider.php)
- **PKCE configuration:** Explicitly enable PKCE. Do not call `stateless()`. Do not add a nonce parameter and assume it will be validated. Nonce is optional in OIDC's authorization-code request, but must be verified if sent. [Socialite PKCE implementation](https://github.com/laravel/socialite/blob/v5.31.0/src/Two/AbstractProvider.php), [OIDC code-flow requirements](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest)
- **Server credentials:** The installation below uses the adapter's documented client-secret setup. Microsoft recommends certificate or federated credentials for production and advises against production client secrets. Production credential selection is unresolved: confirm supported package integration with the deployment's credential requirements, or explicitly document the owner's decision to retain a managed, rotated secret. Certificate authentication is not enabled by merely replacing the secret value with a certificate. [Microsoft credential guidance](https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials)

## 4. Register the application in Microsoft Entra

### 4.1 Prepare names, URLs, and access

1. Choose `<APPLICATION_NAME>`, `<DEV_HOSTNAME>`, and `<PRODUCTION_HOSTNAME>`. These are placeholders, not assigned infrastructure.
2. Plan the following URLs. Replace each hostname before entering values into Entra or Laravel.

   | Purpose | Development | Production |
   | --- | --- | --- |
   | Application origin | `https://<DEV_HOSTNAME>` | `https://<PRODUCTION_HOSTNAME>` |
   | Microsoft callback | `https://<DEV_HOSTNAME>/auth/microsoft/callback` | `https://<PRODUCTION_HOSTNAME>/auth/microsoft/callback` |
   | Sign-out return | `https://<DEV_HOSTNAME>/signed-out` | `https://<PRODUCTION_HOSTNAME>/signed-out` |

3. Use separate development and production registrations as the recommended environment boundary. Repeat the registration steps per environment; each gets its own client ID and credential. If a shared registration is chosen instead, document that decision and register each exact URL.
4. Have an account permitted to register applications in the TG tenant. An Application Developer role can enable registration where ordinary users cannot. An app owner or appropriately privileged administrator must handle later settings and consent; registration access does not automatically confer tenant-wide consent authority. Coordinate with the TG tenant administrator if an operation is unavailable. [Registration prerequisites](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)

### 4.2 Locate and confirm the TG tenant

1. Open the [Microsoft Entra admin center](https://entra.microsoft.com/).
2. Use the directory/tenant switcher to select Tabletop Gaymers.
3. Open **Entra ID → Overview → Properties** and copy **Tenant ID**. If you cannot view it, obtain it from the tenant administrator.
4. Record this GUID as `<TG_TENANT_ID>`. Confirm the organization before proceeding. A tenant display name, domain, subscription ID, and tenant ID are different values. [Find a tenant ID](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-find-tenant)

### 4.3 Create a single-tenant app registration

1. Open **Entra ID → App registrations → New registration**.
2. Enter a descriptive environment-specific name, such as `<APPLICATION_NAME> — Development`.
3. Under **Supported account types**, select the single-tenant option for TG. Depending on portal wording, this is **Single tenant only — <tenant>** or **Accounts in this organizational directory only**.
4. Select **Register**. If the creation screen offers a redirect URI, choose **Web** and enter that environment's callback URL; otherwise add it in the next step.
5. On **Overview**, save **Application (client) ID** and **Directory (tenant) ID**. Confirm the latter matches `<TG_TENANT_ID>`. Add appropriate application owners for continuity. [Register an application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)

### 4.4 Configure callback and sign-out URLs

1. In the registration, open **Authentication**.
2. On **Redirect URI configuration**, select **Add Redirect URI → Web**. Older layouts may say **Add a platform → Web**.
3. Add the exact callback URL for this environment and save.
4. If Microsoft sign-out is offered, add the exact `/signed-out` URL as another **Web redirect URI**.
5. Keep implicit access-token/ID-token issuance and public-client flows disabled; this is a confidential server-side code-flow application, not an SPA registration.
6. Leave **Front-channel logout URL** unset unless a separate front-channel logout handler is deliberately designed. It is not the post-sign-out return URL. [Redirect URI configuration](https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-redirect-uri), [Microsoft logout parameters](https://learn.microsoft.com/en-us/entra/identity-platform/v2-protocols-oidc#send-a-sign-out-request)

### 4.5 Set permissions and consent

1. Open **API permissions → Add a permission → Microsoft Graph → Delegated permissions**.
2. Select `User.Read` and the OpenID permissions `openid`, `profile`, and `email`. `User.Read` may already be present; avoid duplicates.
3. Select **Add permissions** and verify the resulting list. Do not select **Application permissions**, `offline_access`, or broader Graph permissions for this requirement.
4. Have an authorized administrator review and, when required, grant consent using **Grant admin consent for <TG tenant>**. Verify the displayed consent status. Tenant policy can require approval even for ordinarily user-consentable permissions. Assignment-required applications require administrator consent.
5. Also configure the four scopes in Laravel as shown below. Portal permissions do not replace the application's requested scope list. No custom API or **Expose an API** scope is needed for this login integration. [Configure Graph permissions](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-configure-app-access-web-apis), [Scope meanings](https://learn.microsoft.com/en-us/entra/identity-platform/scopes-oidc)

### 4.6 Establish member and guest eligibility

1. Confirm that each guest has an approved B2B guest identity in the TG tenant. If necessary, an authorized administrator uses **Entra ID → Users → New user → Invite external user**, completes the invitation, and ensures onboarding is completed. [Invite B2B guests](https://learn.microsoft.com/en-us/entra/external-id/add-users-administrator)
2. Decide whether every tenant member and guest is eligible, or only an approved subset. Do not infer this from email domains.
3. For an approved subset, the recommended Entra control is **Enterprise apps → All applications → <application> → Properties → Assignment required? → Yes → Save**.
4. Under **Users and groups → Add user/group**, assign the approved members and guests. Direct user assignment is an option; group assignment requires suitable licensing and does not include nested group membership automatically. [Assignment instructions](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/assign-user-or-group-access-portal)
5. If assignment is required, ensure administrator consent is granted. Microsoft documents an assignment exception for Global Administrators. Use application authorization as well if eligibility must exclude any otherwise privileged or tenant-authenticated account. [Assignment requirements and exception](https://learn.microsoft.com/en-us/entra/identity-platform/howto-restrict-your-app-to-a-set-of-users)

### 4.7 Create and save the development client secret

1. Open **App registrations → <application> → Certificates & secrets → Client secrets → New client secret**.
2. Add an environment-specific description and an expiry permitted by TG policy. Microsoft recommends less than 12 months; schedule replacement before expiry.
3. Select **Add** and immediately copy the **Value** to an approved password/secret manager. It is shown only once; if lost, create a replacement.
4. Record its **Secret ID**, description, and expiry as administrative metadata. **The Value is the credential Laravel uses; the Secret ID cannot authenticate the app.** Apply the production-credential decision from Section 3 before deploying. [Credential creation](https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials)

### 4.8 Installation record

Keep actual values in private deployment records, not in this specification.

| Value to save | Where to find it | Laravel setting / purpose |
| --- | --- | --- |
| Application name and environment | App registration Overview | Administrative reference; not a credential. |
| Application (client) ID | App registration Overview | `MICROSOFT_CLIENT_ID` |
| Directory (tenant) ID | App Overview or tenant Properties | `MICROSOFT_TENANT_ID` |
| Client secret **Value** | Certificates & secrets, at creation only | `MICROSOFT_CLIENT_SECRET`; confidential. |
| Secret ID, description, expiry | Certificates & secrets | Rotation inventory; **not** the secret setting. |
| Exact Web callback URI | Authentication | `MICROSOFT_REDIRECT_URI` |
| Exact registered sign-out return URI | Authentication | `MICROSOFT_POST_LOGOUT_REDIRECT_URI`, an application-defined setting. |
| Application origin | Deployment configuration | `APP_URL` |
| Permission and consent status | API permissions | Deployment verification. |
| Eligibility/assignment policy and owners | Enterprise app and TG access records | Authorization and offboarding responsibility. |

## 5. Laravel installation and configuration

The following commands and snippets are implementation instructions, not evidence that anything has been installed or tested. Merge examples into the actual application; do not overwrite existing configuration or provider methods wholesale.

### 5.1 Install and lock dependencies

In the new Laravel application's root, with PHP 8.5 active:

```sh
composer require "laravel/socialite:^5.31" "socialiteproviders/microsoft:^4.10"
composer show laravel/socialite
composer show socialiteproviders/microsoft
composer show socialiteproviders/manager
composer audit
```

Use stable releases; verify the resolved manager supports Laravel 13. Commit `composer.json` and `composer.lock`. Do not install the similarly named `socialiteproviders/microsoft-azure` package: this specification selects `socialiteproviders/microsoft`. Reassess release notes and constraints if adopting a later major version. [Package installation](https://socialiteproviders.com/Microsoft/)

### 5.2 Configure private environment values

Replace every placeholder. Use HTTPS for both environments and serve only Laravel's `public/` directory.

```dotenv
APP_URL="https://<ENVIRONMENT_HOSTNAME>"
MICROSOFT_TENANT_ID="<TG_TENANT_ID>"
MICROSOFT_CLIENT_ID="<APPLICATION_CLIENT_ID>"
MICROSOFT_CLIENT_SECRET="<CLIENT_SECRET_VALUE>"
MICROSOFT_REDIRECT_URI="https://<ENVIRONMENT_HOSTNAME>/auth/microsoft/callback"
MICROSOFT_POST_LOGOUT_REDIRECT_URI="https://<ENVIRONMENT_HOSTNAME>/signed-out"
SESSION_SECURE_COOKIE=true
SESSION_HTTP_ONLY=true
SESSION_SAME_SITE=lax
```

Store `.env` outside the public directory and exclude it from Git. Use the hosting platform's secret injection where available. Keep `APP_DEBUG=false` in production. Read environment values in configuration files, then use `config()` in application code. Rebuild configuration caches when deployment values change; protect cached configuration because it can contain resolved secrets. [Laravel configuration](https://laravel.com/docs/13.x/configuration)

Add this entry to `config/services.php`:

```php
'microsoft' => [
    'client_id' => env('MICROSOFT_CLIENT_ID'),
    'client_secret' => env('MICROSOFT_CLIENT_SECRET'),
    'redirect' => env('MICROSOFT_REDIRECT_URI'),
    // A fixed TG tenant GUID, never a request parameter or a broad authority.
    'tenant' => env('MICROSOFT_TENANT_ID'),
    'include_tenant_info' => false,
    'include_avatar' => false,
],
```

Create `config/microsoft_auth.php` for application-owned settings:

```php
<?php

return [
    // Explicitly replace provider defaults on both sides of the login flow.
    'scopes' => ['openid', 'profile', 'email', 'User.Read'],
    // Our setting: read it when constructing the logout redirect.
    'post_logout_redirect_uri' => env('MICROSOFT_POST_LOGOUT_REDIRECT_URI'),
];
```

Fail deployment validation if required values are missing, the tenant is not the intended GUID, or URLs differ from registration. Tenant profile lookup is unnecessary for restricting the authority; keeping it disabled avoids an additional organization-data request.

### 5.3 Register the Microsoft driver

In `app/Providers/AppServiceProvider.php`, add the listener inside the existing `boot()` method, preserving its other work:

```php
\Illuminate\Support\Facades\Event::listen(
    \SocialiteProviders\Manager\SocialiteWasCalled::class,
    function (\SocialiteProviders\Manager\SocialiteWasCalled $event): void {
        $event->extendSocialite(
            'microsoft',
            \SocialiteProviders\Microsoft\Provider::class
        );
    }
);
```

This follows the maintainer's Laravel 11+ registration pattern, applicable to Laravel 13. [Provider registration](https://socialiteproviders.com/Microsoft/#add-provider-event-listener)

### 5.4 Implement the browser routes

Place these routes in `routes/web.php` so the redirect and callback share Laravel's session middleware:

| Route | Required behavior |
| --- | --- |
| `GET /login` | Public sign-in screen, named `login` for protected-route redirects. |
| `GET /auth/microsoft/redirect` | Start Microsoft sign-in. |
| `GET /auth/microsoft/callback` | Handle cancellation/error or complete authentication. |
| `POST /logout` | CSRF-protected local logout, optionally followed by Microsoft logout. |
| `GET /signed-out` | Public, passive landing page; never clears a newer session or automatically starts login. |
| Protected application routes | Laravel `auth` plus appropriate eligibility and authorization checks. |

Use one controller helper for consistent provider configuration:

```php
private function microsoftProvider(): \SocialiteProviders\Microsoft\Provider
{
    return \Laravel\Socialite\Facades\Socialite::driver('microsoft')
        ->setScopes(config('microsoft_auth.scopes'))
        ->enablePKCE();
}
```

The redirect action returns `$this->microsoftProvider()->redirect()`. The callback obtains `$provider = $this->microsoftProvider()` and then `$externalUser = $provider->user()`. Reapply PKCE on the callback: the redirect and callback are separate requests. Keep the same session store and hostname, and do not call `stateless()` or replace the normal callback with `userFromToken()`. [Socialite routing](https://laravel.com/docs/13.x/socialite#routing), [PKCE source](https://github.com/laravel/socialite/blob/v5.31.0/src/Two/AbstractProvider.php)

Use the normal query callback for this configuration; do not change to `form_post` without reviewing cookie and CSRF behavior. Avoid starting multiple outstanding sign-in attempts in the same browser session; verify that stale callbacks fail safely.

### 5.5 Complete the callback and local login

Implement the following application logic around the package call; this is a specification, not a complete controller:

1. Handle a Microsoft cancellation or error response with a safe restart option. Never treat it as successful authentication.
2. Call the configured provider's `user()` once. State rejection, token exchange failure, or validation failure must stop login. The manager checks state before exchanging the code. [Manager callback source](https://github.com/SocialiteProviders/Manager/blob/4.10.0/src/OAuth2/AbstractProvider.php)
3. Obtain the validated claims through the **same** `$provider->getClaims()` instance. Require a nonempty ID-token result and a `tid` equal to the configured TG tenant. Require a stable Graph user ID; check that it agrees with the token's `oid`. Reject inconsistent or missing identity data. These are application identity/tenant checks, not a replacement signature validator.
4. Apply the approved eligibility policy before creating a local user or calling Laravel login. An existing local user must still be enabled and eligible.
5. Resolve the external identity using a unique database key such as `(provider, tenant_id, object_id)`, with `provider = microsoft`. Link it to the local `users.id`. Use a database uniqueness constraint and transactional creation so concurrent callbacks cannot create duplicate identities. Decide provisioning policy explicitly; no automatic email-based merging.
6. Treat name and email as display/contact data. A guest's UPN can contain `#EXT#` and need not be a deliverable address. The adapter's mapped email is not proof of ownership of a contact mailbox. If contact email is needed, collect and verify it through the app. [Microsoft identity claim semantics](https://learn.microsoft.com/en-us/entra/identity-platform/id-token-claims-reference)
7. Authenticate the resolved local user with Laravel's web guard and regenerate the session. Redirect only to a trusted local destination. Do not persist access tokens, refresh tokens, or entire token responses merely to keep the website signed in. [Laravel manual authentication](https://laravel.com/docs/13.x/authentication#manually-authenticating-users)

Retain enough nonsecret diagnostic context to identify the failing stage; exclude secrets, tokens, authorization codes, and raw provider response bodies. Present a generic user-facing error and a fresh sign-in path.

### 5.6 Configure sessions and logout

Choose the Laravel session store and explicit idle/absolute lifetime policies before release. A database session driver is suitable if the appropriate table is available; multiple app instances must share the session store and application key. Verify secure cookie behavior behind the actual HTTPS proxy. [Laravel sessions](https://laravel.com/docs/13.x/session)

For `POST /logout`, require Laravel CSRF validation, call `Auth::logout()`, invalidate the session, and regenerate the CSRF token. A local-only logout then redirects to a public page. [Laravel logout](https://laravel.com/docs/13.x/authentication#logging-out)

For combined sign-out, finish local logout before redirecting to the adapter's `getLogoutUrl(config('microsoft_auth.post_logout_redirect_uri'))`. Use the configured registered URL only; never accept a return destination from request input. Microsoft sign-out can affect other Microsoft services in that browser and does not promise all-device logout or a password prompt next time. Visiting `/signed-out` alone proves nothing about Microsoft session state. Decide whether the product offers local-only or combined sign-out; two buttons are not required. [Microsoft sign-out behavior](https://learn.microsoft.com/en-us/entra/identity-platform/v2-protocols-oidc#send-a-sign-out-request)

## 6. General use and acceptance

### Operations

- Keep sign-in and authorization separate. Removing an Entra assignment does not automatically terminate an already established Laravel session. Define offboarding, local disablement, and session revocation procedures.
- Review dependency updates and advisories, apply compatible fixes, and rerun authentication checks after relevant changes. Do not edit files in `vendor/`.
- Assign a credential owner. For a secret-based deployment, create a replacement before expiry, update the private configuration, rebuild caches/restart persistent workers as needed, verify login, and then retire the old secret. Do not revoke the working credential before the replacement is verified.
- Request additional permissions only for a new approved feature. No refresh-token storage is needed for login-only operation; retain the current exclusion of `offline_access`.
- Keep future multi-provider identities separately linked to local users. Offer local passwords only in applications whose access model calls for them; never link identities solely by email.

### Acceptance checklist

Run in the actual deployment environment with designated test accounts. Record results without credentials or token captures.

- [ ] Composer resolves supported stable versions on PHP 8.5; Laravel uses MariaDB 11.8; dependency advisory findings are resolved or explicitly assessed.
- [ ] Generated authorization requests target the TG tenant and contain only the intended scopes, state, and an S256 PKCE challenge. Callback processing sends the matching verifier.
- [ ] An eligible TG member signs in, receives the correct local identity, and reaches authorized pages.
- [ ] An approved guest signs in through the TG tenant and resolves to the correct tenant-specific identity; missing or unusual email fields do not cause incorrect linking.
- [ ] A non-guest outsider and, when applicable, an unassigned/ineligible tenant account are denied. Test application eligibility independently of administrator privileges.
- [ ] Cancellation, incorrect state, replayed/stale callbacks, and provider/network errors do not create an authenticated session or provision an unauthorized user.
- [ ] Repeated or concurrent valid logins do not create duplicate external identities. No email-based account takeover/linking path exists.
- [ ] Local login regenerates the session; expired or disabled local users cannot access protected pages under the chosen policy.
- [ ] Logout rejects missing/invalid CSRF tokens and GET requests. Protected pages require login afterward.
- [ ] If enabled, Microsoft logout returns to the registered landing page. A delayed landing-page visit does not clear a newer login.
- [ ] Public responses, application logs, proxy logs, and error monitoring avoid recording credentials, codes, or tokens; production debug output is disabled.

### Decisions still required before implementation or release

Record the application name and URLs; development/production registration separation; the precise member/guest eligibility and provisioning policy; session lifetime and revocation rules; local versus combined logout UX; contact-email requirements; and the production credential strategy. These are application/deployment decisions, not reasons to reopen the selected library without a concrete blocker.

**Verification limit:** This document was checked against linked documentation and released source. No application was created, dependency installation performed, tenant setting changed, or runtime authentication test executed in preparing it.
