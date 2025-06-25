# eslint-plugin-boolean-state

A custom ESLint plugin that enforces consistent naming for `useState` boolean variables in React.  
It ensures that variables initialized with a boolean value follow a readable and conventional pattern like:

✅ `const [isOpen, setIsOpen] = useState(false)`  
✅ `const [hasAccess, setHasAccess] = useState(true)`  
❌ `const [open, setOpen] = useState(false)`  
❌ `const [foo, setFoo] = useState(true)`

This plugin helps teams write more expressive, readable code by enforcing a rule for common boolean prefixes such as:

- `is` (e.g., `isVisible`)
- `has` (e.g., `hasPermission`)
- `can` (e.g., `canSubmit`)
- `should`, `was`, `will`, and more.

## ✨ Features

- ✅ Checks that `useState<boolean>` variables use appropriate prefixes.
- ✅ Ensures that the corresponding setter name matches the variable (e.g., `setIsVisible` for `isVisible`).
- 🔧 Comes with a recommended config for aesy setup.
- 🧠 Helps prevent ambiguous or misleading variable names in React components.

## 📦 Installation

```bash
npm install --save-dev eslint-plugin-boolean-state
```

## 🚀 Usage

Enable the plugin in your ESLint config:

```js
// .eslintrc.js
module.exports = {
  plugins: ['boolean-state'],
  extends: ['plugin:boolean-state/recommended'],
};
```

## 🛠 Developing Locally

If you want to develop or test this plugin locally before publishing to npm, use `npm link`.

### 🔗 Link the plugin globally

From the plugin’s root folder:

```bash
npm link
```

### 🔗 Link in a consumer project (e.g., React app)

In your test project or app:

```bash
npm link eslint-plugin-boolean-state
```

### 🧹 Unlink (clean up)

**In the consumer project:**

```bash
npm unlink eslint-plugin-boolean-state
```

**In the plugin folder (to remove the global link):**

```bash
npm unlink -g
```

### 🔄 Restore npm version in consumer project

```bash
npm install eslint-plugin-boolean-state
```

## Publishing

```bash
npm version patch/...
npm publish
```
