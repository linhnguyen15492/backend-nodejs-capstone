# coding-project-template

`https://github.com/linhnguyen15492/backend-nodejs-capstone`

**Test the endpoints:**

```bash
curl --request GET --url http://localhost:3060/api/secondchance/items

curl --request GET --url http://localhost:3060/api/secondchance/items/875
```

**Test the API**:

```bash
curl "http://localhost:3060/api/secondchance/search?category=Office&name=Curtain"
```

**Test sentiment analysis service API**:

```bash
curl --location --request POST 'localhost:3000/sentiment?sentence=I%20fell%20off%20my%20bike%20yesterday%20and%20got%20injured.%20I%20am%20sad%20and%20not%20able%20to%20go%20to%20work%20today.'
```

**Test registration endpoint:**

```bash
curl --location 'http://localhost:3060/api/auth/register' \
    --header 'Content-Type: application/json' \
    --header 'Cookie: jhub-reverse-tool-proxy=s%3Adf8852e8-fe28-47ac-ab62-cb52fc5bbef5.CxZgc7USbJXpxTv4Vs6BH6esBtnhnYv%2FKQ098HtCm5s' \
    --data-raw '{
        "firstName": "Lachlan",
        "lastName": "Baker",
        "email": "lachie@gmail.com",
        "password": "lac123"
    }'
```

**Test login endpoint:**

```bash
curl --location 'http://localhost:3060/api/auth/login' \
    --header 'Content-Type: application/json' \
    --header 'Cookie: jhub-reverse-tool-proxy=s%3Adf8852e8-fe28-47ac-ab62-cb52fc5bbef5.CxZgc7USbJXpxTv4Vs6BH6esBtnhnYv%2FKQ098HtCm5s' \
    --data-raw '{
        "email": "lachie@gmail.com",
        "password": "lac123"
    }'
```

**Test update endpoint:**

```bash
curl --location --request PUT 'http://localhost/api/auth/update' \
--header 'email: laura@gmail.com' \
--header 'Content-Type: application/json' \
--header 'Cookie: jhub-reverse-tool-proxy=s%3A48bd0518-14a7-4be7-a498-b680be3e0dd0.VdP4w1OI%2BqvZJ5Rg2v%2BGqqKpL0KnqsZ6zF%2BjpK0gg5k' \
--data '{"firstName":"Lauraa"}'
```

## Introduction to GitHub Actions

GitHub Actions provide an event-driven way to automate tasks in your project. It simplifies the process of automating various tasks in your software development workflow, including testing and deploying your code. It allows you to perform tasks like building, testing, and deploying your code directly from GitHub. With GitHub Actions, you can customize how code reviews, managing branches, and resolving issues are handled, making it easier to collaborate and manage your projects.

### Categories

Github Actions Workflows can be of different categories. The following are the categories of workflows available:

- Deployment workflow in GitHub refers to the automated process of deploying your software applications or code to a target environment, such as a server or cloud platform, using GitHub Actions. There are many predefined deployment workflows that GitHub provides for most often used cloud platforms. You can find more details about these here.

- Continuous integration workflow is a software development practice where developers regularly integrate their code changes into a shared repository, such as Git, multiple times throughout the day. Each integration is automatically verified by building the code and running automated tests to detect and fix integration errors quickly. This is highly recommended for code involving many developers who collaborate. There are many predefined continuous integration workflows that GitHub provides. You can find more details about these here.

- Automation workflow is a series of automated steps or tasks designed to streamline and optimize a specific process or set of tasks within an organization or project. These workflows use automation tools and technologies to reduce manual effort, increase efficiency, and improve consistency and reliability. This could be something as simple as greeting the developer on his first collaboration on GitHub to sending reminders about pull requests.

You have a marketplace which provides various options and this is an open-source that is constantly evolving with more apps and actions added on to the marketplace. You can check this link for all the way in which you can automate development workflow. Some popular automations available are code security scanning and vulnerability check, linting and code infographics generator.

- Pages workflow typically refers to the process of building and deploying static websites using GitHub Pages. GitHub Pages is a feature of GitHub that allows users to host static websites directly from their GitHub repositories. With this workflow, developers can easily host and maintain static websites directly from their GitHub repositories, making it easy to share content, collaborate with others, and showcase projects online.

### GitHub action components

Here are some typical GitHub action components:

- Workflows: A collection of jobs you can add to your repository.
- Events: An activity that launches a workflow.
- Jobs: A sequence of one or more steps. Jobs are run in parallel by default.
- Steps: Individual tasks that can run in a job. A step may be an action or a command.
- Actions: The smallest block of a workflow.

### Events

You can listen to different kinds of events. Here are a few examples:

- push: Runs tasks when someone pushes to a repository branch.
- pull_request: Runs tasks when someone creates a pull request (PR). You can also start tasks when certain activities happen, such as:
  - PR opened
  - PR closed
  - PR reopened
- create: Run tasks when someone creates a branch or a tag.
- delete: Run tasks when someone deletes a branch or a tag.
- manually: Jobs are kicked off manually.
