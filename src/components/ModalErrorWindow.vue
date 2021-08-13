<template>
    
    <div class="modal" @click="display = 'none'" v-bind:style="{display: display}">
        <div class="modal-content slide-down">
            <div class="modal-title">
                <div>&nbsp;</div>
                <h2>An error occurred.</h2>
                <div class="close"  @click="display = 'none'">&nbsp;&times;</div>
            </div>
            <p>{{errorInfo}}</p>
        </div>
    </div>
</template>


<script>

export default {
  name: "ModalErrorWindow",
  emits: ["windowClosed"],
  props: {
      errorInfo: { type: String,
          default: '',
      }
  },
  data: function () {
  return {
        show: true,
        display: 'block',
     }
  },
  watch: {
    display: function() {
        if (this.display === 'none') {
            this.$emit('windowClosed')
        }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal {
  display: block; 
  position: fixed; 
  z-index: 10; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  overflow: auto; 
  background-color: rgb(0,0,0);  
  background-color: rgba(0,0,0,0.4); 
}
h2{
    font-size: 1.5rem;
    font-weight: 500;
    justify-self: center;
}

.modal-content {
  background-color: #fefefe;
  margin: 0 auto; 
  padding: 20px;
  border: 1px solid red;
  width: auto; 
  min-width: 360px;
  max-width: 700px;
}
.modal-title {
    display: grid;
    grid-template-columns: 1fr 20fr 1fr;
    justify-content: space-between;
    align-items: center;
}


.close {
  color: #aaa;
  text-align: right;
  font-size: 2.5rem;
  font-weight: bold;
  transition: all .30s ease-in-out;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
  transition: all .30s ease-in-out;
}
.slide-down{
    animation: down .75s ease-in-out forwards ;
    
}

@keyframes down {
  0% {
    transform: translateY(-50%);
    opacity: 0;
  }
  100% {
    transform: translateY(100%);
    opacity: 1;
  }
}
</style>