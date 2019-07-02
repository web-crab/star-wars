<template>
  <div>
    <header>
      <strong class="logo">Star Wars Wiki</strong>
      <nav>
        <router-link class="nav-link" to="/people">People</router-link>
      </nav>
    </header>

    <keep-alive>
      <router-view :key="$route.fullPath" />
    </keep-alive>

  </div>
</template>

<style>

:root {
  --color-bg: #191114;
  --color-primary: #2d8cd0;
  --color-text-1: #e6e2e1;
  --color-text-2: #bba69d;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

body {
  max-width: 992px;
  padding: 2em;
  margin: 0 auto;
  background-color: var(--color-bg);
  font-size: 20px;
  font-family: sans-serif;
  color: var(--color-text-1);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

header {
  display: flex;
  align-items: center;
  margin-bottom: 2em;
}

.logo {
  margin-right: 1em;
  font-size: 1.5em;
  font-weight: 900;
  color: var(--color-text-2);
}

.nav-link {
  position: relative;
  display: inline-block;
  padding: 0.5em 1em;
  font-weight: bold;
  color: inherit;
  text-decoration: none;
}

.nav-link:before {
  content: '';
  position: absolute;
  left: 0;
  bottom: -0.5em;
  display: block;
  width: 100%;
  height: 3px;
  background-color: var(--color-primary);
  opacity: 0;
  transform: translate3d(0, 1em ,0);
  transition: all 0.25s ease-out;
  pointer-events: none;
}

.nav-link:hover,
.nav-link:focus,
.router-link-exact-active {
  color: var(--color-primary);
}

.router-link-exact-active:before {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

@media screen and (max-width: 768px) {
  body {
    font-size: 14px;
  }
}

@media screen and (max-width: 480px) {
  body {
    font-size: 10px;
  }
}

</style>
