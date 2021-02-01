<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary" :sticky="true">
      <b-container>
        <b-navbar-brand href="#">CEK RESI</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- <b-navbar-nav>
            <b-nav-item href="#">Link</b-nav-item>
          </b-navbar-nav> -->

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto"> </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <main>
      <Nuxt />
    </main>
  </div>
</template>
