# Next-accelerate

*Next-accelerate* is a command-line tool (CLI) that automates repetitive tasks during the development of Next.js projects, already implementing part of the architecture with ready-to-use templates

![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=brito-response_next-accelerate&metric=alert_status)
![Bugs](https://sonarcloud.io/api/project_badges/measure?project=brito-response_next-accelerate&metric=bugs)
![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=brito-response_next-accelerate&metric=code_smells)
![Coverage](https://sonarcloud.io/api/project_badges/measure?project=brito-response_next-accelerate&metric=coverage)
![Duplicated Lines](https://sonarcloud.io/api/project_badges/measure?project=brito-response_next-accelerate&metric=duplicated_lines_density)
![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=brito-response_next-accelerate&metric=security_rating)
![Maintainability](https://sonarcloud.io/api/project_badges/measure?project=brito-response_next-accelerate&metric=sqale_index)
![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=brito-response_next-accelerate&metric=vulnerabilities)

## Requirements

> The next.js project should follow the development pattern with (App Router).
> Your project should follow a standardized folder structure using (Nested Layouts or Layout Composition) and Route Groups.
> create next project with settings custom

ex: npx create-next-app frontend

? Would you like to use the recommended Next.js defaults? › - Use arrow-keys. Return to submit.

-   Yes, use recommended defaults

-   No, reuse previous settings

- ❯   No, **_customize settings_**

## folder structure 
Simple and straightforward, for any new feature you intend to create, just follow the steps.
> Create an assembler function in (commands), -> create a builder that will be used by the assembler in (builders) -> register its functionality in the switch, as an option (in src/index.ts -> main).

> ⚠️ **Important**
> Don't complicate things, this is an CLI, don't use decorators and the like, Node.js doesn't support them and this will generate errors. Remember: simplicity favors women, and in Node.js it's no different.

```
├── src
│   ├── builders
│   │   ├── core
│   │   │   └── next-accelerate-builder.ts
│   │   ├── interfaces
│   │   │   ├── next-auth-builder.interface.ts
│   │   │   ├── resource-api-builder.interface.ts
│   │   │   ├── resource-builder.interface.ts
│   │   │   ├── resource-form-builder.interface.ts
│   │   │   ├── resource-install-builder.interface.ts
│   │   │   └── tests-builder.interface.ts
│   │   ├── next-auth-builder.ts
│   │   ├── resource-api-builder.ts
│   │   ├── resource-builder.ts
│   │   ├── resource-form-builder.ts
│   │   └── tests-builder.ts
│   ├── commands
│   │   ├── create-api-resource.ts
│   │   ├── create-config-tests.ts
│   │   ├── create-form-resource.ts
│   │   ├── create-nextauth-resource.ts
│   │   ├── create-resource.ts
│   │   └── index.ts
│   ├── index.ts
│   ├── templates
│   │   ├── components
│   │   │   ├── button-comp.ts
│   │   │   ├── footer-comp.ts
│   │   │   ├── header-comp.ts
│   │   │   ├── index.ts
│   │   │   └── menu-aside-comp.ts
│   │   ├── config
│   │   │   ├── decode-claims.ts
│   │   │   ├── environment.ts
│   │   │   ├── hiddenpaths.ts
│   │   │   ├── proxy.ts
│   │   │   ├── request-api.ts
│   │   │   ├── session.ts
│   │   │   └── utils.ts
│   │   ├── forms
│   │   │   ├── create-form.ts
│   │   │   ├── delete-form.ts
│   │   │   ├── forgot-form.ts
│   │   │   ├── login-form.ts
│   │   │   ├── login-wrapper-form.ts
│   │   │   ├── redef-form.ts
│   │   │   ├── register-form.ts
│   │   │   ├── schems
│   │   │   │   ├── create-form-scheme.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── login-form-scheme.ts
│   │   │   │   ├── redef-form-scheme.ts
│   │   │   │   ├── register-form-scheme.ts
│   │   │   │   ├── update-form-scheme.ts
│   │   │   │   └── updateuser-form-scheme.ts
│   │   │   ├── update-form.ts
│   │   │   └── update-user-form.ts
│   │   ├── index.ts
│   │   ├── inputs
│   │   │   └── input-template.ts
│   │   ├── layouts
│   │   │   ├── capture-error-layout.ts
│   │   │   ├── index.ts
│   │   │   ├── main-layout.ts
│   │   │   ├── manager-layout-css.ts
│   │   │   ├── manager-layout.ts
│   │   │   ├── private-next-layout.ts
│   │   │   ├── public-next-layout.ts
│   │   │   └── root-next-layout.ts
│   │   ├── pages
│   │   │   ├── delete-page.ts
│   │   │   ├── detail-page.ts
│   │   │   ├── list-page.ts
│   │   │   ├── manager-page.ts
│   │   │   ├── new-page.ts
│   │   │   └── update-page.ts
│   │   ├── routes
│   │   │   ├── create-resource-route.ts
│   │   │   ├── delete-route.ts
│   │   │   ├── image-upload-route.ts
│   │   │   ├── manager-context.ts
│   │   │   ├── nextauth-route.ts
│   │   │   ├── set-user-photo-route.ts
│   │   │   ├── update-resource-route.ts
│   │   │   ├── user-create-route.ts
│   │   │   └── user-update-route.ts
│   │   └── tests
│   │       ├── config-playwright.ts
│   │       ├── config-vitest.ts
│   │       └── index.ts
│   └── utils
│       ├── contracts
│       │   └── build-options.ts
│       ├── fs.ts
│       ├── guards
│       │   ├── dependency.guard.ts
│       │   ├── index.ts
│       │   └── next-verify.guard.ts
│       ├── interceptors
│       │   └── args.interceptor.ts
│       ├── services
│       │   ├── git.service.ts
│       │   ├── install-dependences-form.service.ts
│       │   ├── install-dependences.service.ts
│       │   ├── install-nextauth-motion.service.ts
│       │   ├── install-tests-e2e-dependences.service.ts
│       │   └── install-tests-unit-dependences.service.ts
│       └── string.ts
```

## 📦 Installation

You can run the CLI **without installing anything globally** using `npx`:

```bash
npx next-accelerate create singular_resource_name

```

Or install globally:

```bash
npm install -g next-accelerate && next-accelerate create singular_resource_name

```

Or you can download directly from the repository and build it:

```bash
git clone https://github.com/brito-response/next-accelerate.git && cd next-accelerate && npm i && npm run build && npm link
```

### For now, the CLI only offers the following features

- Create pages for a resource.

```bash
npx next-accelerate create ingular_resource_name
```

- Create forms resouces folders for resources.

```bash
npx next-accelerate create:form singular_resource_name
```

- Using git commit flag.

```bash
npx next-accelerate create:form singular_resource_name --git
```

- Config Next-Auth.

```bash
npx next-accelerate config:next-auth --git
```

At the end, you can run:

```bash
npm run dev
```

And see your project more structured and faster.

Let's develop! 🚀

## 📁 Generated structure (example)

```txt
src/
├─ app/
| └── (publics)/
| └───(privates)/ _resources_dirs_
├─ components/
├─ hooks/
├─ lib/
├─ services/
└─ utils/

```

> The structure can evolve with new versions of the CLI.

## 🧠 Why use it?

- ⏱️ Saves setup time

- 📐 Maintains consistency across projects

- 🧹 Avoids repetitive boilerplate code
- 🔁 Ideal for freelancers, squads, and studies

## 🛠 Technologies

- Node.js

- Next.js

- TypeScript

---

## 📄 License

This project is licensed under the **MIT** license.

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit your changes
4. Open a Pull Request

## 🏃 Nex feature

- support for testing the created components

## ✨ Author

Dveloped by **Neto** 💅
If this project helped you, leave a ⭐ on the repository!
