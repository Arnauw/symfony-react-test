# Project Setup and Usage

This document provides instructions on how to install the project's dependencies and run it in a development environment.

## 💻 Installation

Follow these steps for the initial one-time setup of the project.

1.  **Install PHP Dependencies:**
    Use Composer to install all the required PHP packages.
    ```bash
    composer install
    ```

2.  **Install JavaScript Dependencies:**
    Install all the required JavaScript packages.
    ```bash
    npm install
    ```
    *(If you do have `pnpm`, you can use `pnpm install` instead).*
    <br><br>
3.  **Create the Database:**
    This command will create the database if it doesn't already exist.
    ```bash
    symfony console doctrine:database:create
    ```

4.  **Run Database Migrations:**
    This command will apply all necessary database schema changes.
    ```bash
    symfony console doctrine:migrations:migrate
    ```

## 🚀 Running the Application for Development

There are two primary ways to run the application for development.

### Standard Workflow (Manual Refresh)

This is the minimum required to run the application. You will need **two separate terminals**.

*   **Terminal 1: Start the Symfony Server**
    This command starts your PHP application server.
    ```bash
    npm run serve
    ```
    *(This command runs `symfony serve -no-tls` by default to ensure the server runs without `https` but `http`, it avoids conflict with webpack encore dev-server).*
<br><br>
*   **Terminal 2: Build and Watch Assets**
    This command watches for changes in your `assets/` folder and rebuilds the files into the `public/build` directory when you save a change.
    ```bash
    npm run watch
    ```
    > **Note:** With this setup, you will need to **manually refresh your browser** to see any frontend changes.

### Advanced Workflow (with Live Reloading)

This setup is optional but highly recommended for a better development experience as it enables auto-reloading. This requires **three separate terminals**.
<br>
`Note that it is buggy and not as perfect as the live reload in React apps, you will still have to manually reload often.`


> **Important:** The `dev-server` must be launched **BEFORE** you start the Symfony server. This allows Symfony to correctly link to the dev-server's assets.

1.  **Terminal 1 (The Live Reloader): `pnpm run dev-server`**
    This command's only job is to provide auto-reloading.
    ```bash
    npm run dev-server
    ```

2.  **Terminal 2 (The Application Server): `symfony serve`**
    This starts your main PHP application server.
    ```bash
    npm run serve
    ```
    *(Or you can run `symfony serve -no-tls` directly if you prefer).*
    <br><br>

3.  **Terminal 3 (The Asset Builder): `npm run watch`**
    This command compiles your assets into the `public/build` directory so the Symfony server can find them.
    ```bash
    npm run watch
    ```

#### Handling HTTPS & Certificate Errors

By default, both servers may try to use HTTPS. The `dev-server` uses a self-signed certificate that your browser will not trust by default, which will block assets from loading.

To fix this, you must manually trust the certificate:
1.  Open a new browser tab and navigate directly to the dev-server's URL (e.g., **`https://127.0.0.1:8080`**).
2.  You will see a security warning page ("Your connection is not private", etc.).
3.  Click **"Advanced"** and then **"Proceed to 127.0.0.1 (unsafe)"** or **"Accept the Risk and Continue"**.
4.  You can now close that tab. Your browser will remember to trust this certificate.

#### Forcing an HTTP-Only Setup

If you prefer to avoid HTTPS issues, you can force both servers to use HTTP.

1.  **Configure Encore for HTTP:**
    In your `webpack.config.js` file, find the `.configureDevServerOptions()` block and comment out the `type` property.

    ```javascript
    // webpack.config.js
    .configureDevServerOptions(options => {
        options.hot = true;
        options.liveReload = true;
        options.server = {
            // type: 'https', // <-- Comment this line out
        };
    })
    ```

2.  **Start the Symfony Server with HTTP:**
    Use the `--no-tls` flag to force the Symfony server to use HTTP.
    ```bash
    symfony serve --no-tls
    ```

---

### IGNORE THIS PART PLEASE

### Recommended: Setting up a trusted HTTPS environment

For the best and most secure development experience, it's recommended to run both servers over HTTPS. This involves a one-time setup to create a local Certificate Authority (CA) that your browser can trust.

1.  **Install a Local Certificate Authority (One-Time Setup):**
    Run the following Symfony CLI command. This will generate a local CA and attempt to install its root certificate into your system and browser trust stores. You only need to do this once per machine.
    ```bash
    symfony server:ca:install
    ```

2.  **Configure Encore for HTTPS:**
    In your `webpack.config.js` file, ensure the `server` configuration is set to use HTTPS. Uncomment the `type: 'https'` line if it is commented out.

    ```javascript
    // webpack.config.js
    .configureDevServerOptions(options => {
        options.hot = true;
        options.liveReload = true;
        options.server = {
            type: 'https', // <-- Make sure this line is active
        };
    })
    ```

3.  **Manually Trust the Encore Certificate (One-Time Browser Step):**
    The `ca:install` command makes the Symfony server trusted, but the Encore dev-server uses its own separate, self-signed certificate. You must tell your browser to trust it manually the first time.

    1.  Start your `dev-server` (`npm run dev-server`).
    2.  Open a new browser tab and navigate directly to the dev-server's URL (e.g., **`https://127.0.0.1:8080`**).
    3.  You will see a security warning page ("Your connection is not private", etc.).
    4.  Click **"Advanced"** and then **"Proceed to 127.0.0.1 (unsafe)"** or **"Accept the Risk and Continue"**.
    5.  You can now close that tab. Your browser will remember to trust this certificate.

4.  **Run the Servers:**
    You can now run your Symfony server with its standard command, without the `--no-tls` flag.
    ```bash
    symfony serve
    ```
    Your application will be available at `https://127.0.0.1:8000` and should now load all assets from `https://127.0.0.1:8080` without any certificate errors.
