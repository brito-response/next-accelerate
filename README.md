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

> The Next.js project already exists following the (App Router) pattern.
> Your project follows the standardized folder structure using (Nested Layouts or Layout Composition) and Route Groups.

## 📦 Installation

You can run the CLI **without installing anything globally** using `npx`:

```bash
npx next-accelerate create singular_resource_name

```

Or install globally:

```bash
npm install -g next-accelerate && next-accelerate create singular_resource_name

```

### For now, the CLI only offers the following features

- Create default folders for resources.

```bash
npx next-accelerate create ingular_resource_name
```

- Create forms resouces folders for resources.

```bash
npx next-accelerate create:form ingular_resource_name
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

## ✨ Author

Dveloped by **Neto** 💙
If this project helped you, leave a ⭐ on the repository!
