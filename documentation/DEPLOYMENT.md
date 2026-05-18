# Deployment of BlastoDB

BlastoDB is automatically build and deployed for each push to the "main" and "dev" branch.
Here you find some details about the deployment.

**Table of Contents**
- [Overview](#overview)
- [How Deployment Works](#how_deployment_works)
  - [Automatic Deployment](#automatic_deployment)
  - [Manual Deployment](#manual_deployment)
- [Monitoring Deployments](#monitor_deployments)
- [Workflow File](#workflow_file)
- [Testing Changes on Dev Branch](#testing_changes)
- [GitHub Pages Configuration](#gh_pages_config)
- [Troubleshooting](#troubleshooting)
  - [Deployment Failed](#failed_deployment)
  - [Changes Not Showing Up](#changes_not_showing)
  - [Path Prefix Issues on Test Site](#test_site_issues)
- [More Information](#more_info)

## Overview (#overview)

BlastoDB uses GitHub Actions to automatically build and deploy the website whenever you push changes to the repository. There are two deployment environments:

- **Live-Version of the Website**: Deployed from the `main` branch to `https://blastodb.com/` (or `hhttps://tsaousis-lab.github.io/blastodb`)
- **Development Version for Testing**: Deployed from the `dev` branch to `https://blastodb.com/dev/` (or `https://tsaousis-lab.github.io/blastodb/dev/`)

The *blastodb.com/dev/* site is so you can test your content before 

## How Deployment Works (#how_deployment_works)

### Automatic Deployment (#automatic_deployment)

Whenever you push changes to either the `main` or `dev` branch, the following happens automatically:

1. GitHub Actions triggers the "Build and Deploy" workflow
2. The workflow checks out your code
3. It installs dependencies using npm
4. It builds the website using 11ty (Eleventy)
5. It deploys the built files to GitHub Pages

The entire process usually takes 1-2 minutes.

### Manual Deployment (#manual_deployment)

You can also manually trigger a deployment by:

1. Going to your repository on GitHub
2. Click on the `Actions` tab
3. Select "Build and Deploy" from the list
4. Click the "Run workflow" button
5. Select the branch you want to deploy from the dropdown
6. Click "Run workflow"

## Monitoring Deployments (#monitor_deployments)

To check the status of your deployment:

1. Go to your repository on GitHub
2. Click on the `Actions` tab
3. You'll see a list of workflow runs
4. Click on the most recent "Build and Deploy" run to see details
5. You can expand each step to see what happened

If a deployment fails, you'll see a red ✗. Click on the failed run to see the error messages and troubleshoot.

## Workflow File (#workflow_file)

The deployment workflow is defined in `.github/workflows/deploy.yml`. Here's what it does:

- **Triggers**: On push to `main` or `dev` branches, or manually via workflow dispatch
- **Node.js Version**: Uses Node.js 18
- **Build Command**: Runs `npm run build` which executes 11ty
- **Deployment**: Uses the peaceiris GitHub Actions to deploy to GitHub Pages
- **Destination**: Main branch deploys to root (`/`), dev branch deploys to `/test/` subdirectory

## Testing Changes on Dev Branch (#testing_changes)

If you want to test changes before deploying them to the main website:

1. Make your changes in the `dev` branch (or create a new branch from `dev`) #TODO: reference offline workflow
2. Push to the `dev` branch
3. Wait for the deployment to complete (1-2 minutes)
4. Visit `https://blastodb.com/dev/` to see your changes
5. If everything looks good, create a pull request and merge to `main` #TODO: explain this better
6. Once merged to `main`, it will automatically deploy to the production website

## GitHub Pages Configuration (#gh_pages_config)

The deployment is configured to use the `gh-pages` branch as the source. This branch is automatically created and managed by the deployment workflow—you don't need to do anything manually.

In your GitHub repository settings (Settings → Pages), you should see:
- **Source**: Deploy from a branch
- **Branch**: `gh-pages`
- **Folder**: `/ (root)`

## Troubleshooting (#troubleshooting)

### Deployment Failed (#failed_deployment)

Check the Actions tab to see the error message:

1. Go to `Actions` tab
2. Click on the failed workflow run
3. Expand the "Build site" or "Deploy to GitHub Pages" step
4. Look at the error message

Common issues:
- **npm install failed**: Check that `package.json` is valid and all dependencies are available
- **Build failed**: Check the 11ty build output for template or markdown errors
- **Deploy failed**: Usually a permissions issue with the GitHub token (this should not happen with the default setup)

### Changes Not Showing Up (#changes_not_showing)

- Wait 1-2 minutes for the deployment to complete
- Hard refresh your browser (Ctrl+Shift+R on Windows/Linux, Cmd+Shift+R on Mac)
- Check that the workflow run completed successfully in the Actions tab
- Verify you're visiting the correct URL:
  - Main site: `https://blsatodb.com/` or `https://tsaousis-lab.github.io/blastodb/`
  - Test site: `https://blsatodb.com/dev/` or `https://tsaousis-lab.github.io/blastodb/dev/`

### Path Prefix Issues on Test Site (#test_site_issues)

If links or assets on the test site are broken, the path prefix might not be correct. This would need to be configured in `.eleventy.js` to handle the `/dev/` subdirectory properly.

## More Information (#more_info)

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [11ty Documentation](https://www.11ty.dev/)
