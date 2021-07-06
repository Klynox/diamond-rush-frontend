<template>
  <div>
    <main class="bg">
      <DesktopHeader />
      <Nuxt />
    <WalletDialogs/>
    </main>
  </div>
</template>
<script>
import DesktopHeader from "@/components/partials/desktop_header";
import WalletDialogs from "@/components/dialogs/wallet-dialogs";
export default {
  components: {
    DesktopHeader,
    WalletDialogs,
  },
};
</script>
<style>
*,
*::before,
*::after {
  transition: all 0.3s ease-in-out;
}
body {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #fff;
  font-family: "SansationRegular", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
}
::-moz-selection {
  background: #d184f8;
  color: #fff;
}

::selection {
  background: #d184f8;
  color: #fff;
}

::-moz-selection {
  background: #d184f8;
  color: #fff;
}
.bg {
  width: 100%;
  min-height: 100vh;
  background-color: #320293;
  background-attachment: fixed;
  background: #2b1097 -moz-linear-gradient(180deg, #2b1097 0%, #a7178f 100%) 0% 0%
    no-repeat padding-box;
  background: #2b1097 -webkit-linear-gradient(180deg, #2b1097 0%, #a7178f 100%) 0%
    0% no-repeat padding-box;
  background: #9996a5 -o-linear-gradient(180deg, #2b1097 0%, #a7178f 100%) 0% 0%
    no-repeat padding-box;
  background: #2b1097 linear-gradient(180deg, #2b1097 0%, #a7178f 100%) 0% 0%
    no-repeat padding-box;
  opacity: 1;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#2B1097",endColorstr="#A7178F",GradientType=1);
}
@font-face {
  font-family: "SansationBold";
  src: url("/fonts/sansation_bold.ttf") format("truetype");
}
@font-face {
  font-family: "SansationLight";
  src: url("/fonts/sansation_light.ttf") format("truetype");
}
@font-face {
  font-family: "SansationRegular";
  src: url("/fonts/sansation_regular.ttf") format("truetype");
}
.bnvc-wrapping {
  width: 100%;
  padding: 2rem 0.95rem 1.23rem 0.95rem;
  margin-top: 15rem;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: #2b1097 linear-gradient(180deg, #2b1097 0%, #a7178f 100%) 0% 0%
    no-repeat padding-box;
}
.bnvc-container {
  background-image: url("/images/bnvc-background-poligon.png");
  background-size: 100% 24rem;
  background-position: top left;
  background-repeat: no-repeat;
}
@media (max-width: 36.25rem) {
  .display-mobile-flex {
    display: flex !important;
  }
  .display-mobile {
    display: block !important;
  }
  .display-pc-flex,
  .display-pc {
    display: none !important;
  }
  .bg {
    background: transparent;
    background-attachment: initial;
    filter: initial;
  }
}
@media (min-width: 36.313rem) {
  .display-mobile,
  .display-mobile-flex {
    display: none !important;
  }
  .display-pc-flex {
    display: flex !important;
  }
  .display-pc {
    display: block !important;
  }
  .bnvc-wrapping {
    min-height: auto;
    padding: initial;
    border-top-left-radius: initial;
    border-top-right-radius: initial;
    background: initial;
  }
  .bnvc-container {
    background-image: initial;
    background-size: initial;
    background-position: initial;
  }
}
</style>
