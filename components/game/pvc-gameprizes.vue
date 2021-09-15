<template>
  <div class="d-flex justify-content-between">
    <div class="d-flex flex-column justify-content-end text-center k-bx">
      <div
        class="
          small-1
          text-center
          d-flex
          align-items-center
          justify-content-center
        "
      >
        <img src="/images/xvhM-diamond.svg" class="diamond-kxmiT" />
      </div>
      <span class="kxmiT-time">{{ settings.firstPriceDuration }} secs</span>
      <span class="kxmiT-price">{{ settings.firstPrice }} USD</span>
    </div>
    <div class="d-flex flex-column justify-content-end text-center k-bx">
      <div
        class="
          small-2
          text-center
          d-flex
          align-items-center
          justify-content-center
        "
      >
        <img src="/images/xvhM-diamond.svg" class="diamond-kxmiT" />
      </div>
      <span class="kxmiT-time">{{ settings.secondPriceDuration }} secs</span>
      <span class="kxmiT-price">{{ settings.secondPrice }} USD</span>
    </div>
    <div class="d-flex flex-column justify-content-end text-center k-bx">
      <div
        class="
          small-3
          text-center
          d-flex
          align-items-center
          justify-content-center
        "
      >
        <img src="/images/xvhM-diamond.svg" class="diamond-kxmiT" />
      </div>
      <span class="kxmiT-time">{{ settings.thirdPriceDuration }} secs</span>
      <span class="kxmiT-price">{{ settings.thirdPrice }} USD</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["settings"],
};
</script>
<style lang="scss" scoped>
.k-bx {
  height: 125px;
}
.diamond-kxmiT {
  width: 100%;
  height: 100%;
  text-align: center;
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
}
.kxmiT-time {
  color: #f19de3;
  font-size: 13px;
}
.kxmiT-price {
  color: #00fff6;
  font-size: 14px;
}
.small-1,
.small-2,
.small-3 {
  width: 90px;
  height: 90px;
  margin-bottom: 5px;
}
.small-1 {
  .diamond-kxmiT {
    width: 100%;
  }
}
.small-2 {
  .diamond-kxmiT {
    width: 70px;
    height: 70px;
  }
}
.small-3 {
  .diamond-kxmiT {
    width: 50px;
    height: 50px;
  }
}
.small-prize {
  .small-1 {
    width: 70px !important;
    height: 70px !important;
    margin-bottom: 5px;
  }
  .small-2 {
  .diamond-kxmiT {
  width: 50px !important;
  height: 50px !important;
  }
}
.small-3 {
  .diamond-kxmiT {
  width: 30px !important;
  height: 30px !important;
  }
}
}
</style>