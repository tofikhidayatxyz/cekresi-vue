<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="light"
      variant="white"
      :sticky="true"
      class="navbar-main"
    >
      <b-container>
        <nuxt-link to="/" class="navbar-brand">
          <img src="logo.svg" class="logo" alt="" />
        </nuxt-link>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/documentation">
                API Documentation
              </nuxt-link>
            </li>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <main>
      <Nuxt />
    </main>
  </div>
</template>
<style lang="scss" scoped>
.navbar-main {
  box-shadow: 0px 0px 10px 0px rgb(0, 0, 0, 0.1);
  min-height: 80px;
  .nav-link {
    font-weight: 500;
    color: var(--dark);
  }
  .logo {
    height: 33px;
    @media screen and (max-width: 768px) {
      height: 26px;
    }
  }
}
</style>
