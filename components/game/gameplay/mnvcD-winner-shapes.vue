<template>
  <div class="bldG-card-shapes">
    <img src="/images/shape-1.svg" class="shape-1" />
    <img src="/images/shape-2.svg" class="shape-2" />
    <img src="/images/shape-1.svg" class="shape-3" />
    <img src="/images/shape-1.svg" class="shape-4" />
    <img src="/images/shape-1.svg" class="shape-5" />
  </div>
</template>
<style lang="scss" scoped>
.shape-1,
.shape-2,
.shape-3,
.shape-4,
.shape-5 {
  position: absolute;
}
.shape-1,
.shape-3,
.shape-4,
.shape-5 {
  width: 2.313rem;
  height: 2.313rem;
}
.shape-2 {
  width: 3.563rem;
  height: 3.563rem;
  top: -1rem;
  right: 5%;
}
.shape-1 {
  top: 0rem;
  left: 0rem;
  -webkit-transform: rotate(40deg);
  transform: rotate(40deg);
}
.shape-3 {
  top: 10.8rem;
  right: 1%;
}
.shape-4 {
    left: 34%;
    top: 12rem;
    -webkit-transform: rotate(18deg);
  transform: rotate(18deg);
}
.shape-5 {
    top: 25rem;
    left: 0;
}
</style>