<template>
  <div class="d-flex flex-row justify-content-between trophy-button">
    <span><img src="/images/levels/diamond-kbl.svg" /></span>
    <span><img src="/images/levels/diamond-kbl.svg" /></span>
    <span><img src="/images/levels/diamond-kbl.svg" /></span>
    <span><img src="/images/levels/diamond-kbl.svg" /></span>
    <span><span class="trophy-figure active">5</span></span>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.trophy-button span {
  width: 50px;
  height: 50px;
  background-color: #00fff6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  &.active:after {
    content: "";
    border-radius: 50%;
    position: absolute;
    border: 2px dashed #00fff6;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
  }
  img {
    width: 40%;
    height: 40%;
  }
  .trophy-figure {
    color: #2b1097;
    font-size: 1rem;
  }
}
@media (max-width: 348px) {
  .trophy-button span {
    width: 40px;
    height: 40px;
  }
}
</style>