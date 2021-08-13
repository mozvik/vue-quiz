<template>
    <transition name="fade">
        <div class="popup-modal" v-if="isVisible">
            <div class="content">
                <h2>{{ title }}</h2>
                <p v-if="!isSuccessful">{{ message }}</p>
                <h3 v-if="isSuccessful">{{ succesfulMessage }}</h3>
                <div v-if="!isSuccessful" class="popup-buttons">
                    <button class="ok-btn" @click="okClicked">{{ okBtn }}</button>
                    <button class="cancel-btn" @click="cancelClicked">{{ cancelBtn }}</button>
                    
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'PopUpModal',
    data: () => ({
        isVisible: false,
        isSuccessful: false,
        title: "",
        message: "",
        okBtn: "Ok",
        cancelBtn: "Cancel",
        succesfulMessage: "",
        okPromise: "",
        cancelPromise: "",
    }),
    methods: {
        show( parameters ={}) {
            this.isVisible = true
            this.title = parameters.title
            this.message = parameters.message
            this.succesfulMessage = parameters.succesfulMessage
            if (parameters.okBtn) {
                this.okBtn = parameters.okBtn
            }
            if (parameters.cancelBtn) {
                this.cancelBtn = parameters.cancelBtn
            }
            return new Promise((ok, cancel) => {
                this.okPromise = ok
                this.cancelPromise = cancel
            })
        },
        hide(msg) {
            if (msg) {
                this.isSuccessful = true
                setTimeout(() => {
                        this.isVisible = false
                        this.isSuccessful = false
                    }, 1000)    
            } else{this.isVisible = false}
            
            
        },
        okClicked() {
            this.hide(this.succesfulMessage)
            this.okPromise(true)
        },
        cancelClicked() {
            this.hide()
            this.okPromise(false)
        }
    },
}
</script>
<style scoped>


.popup-modal {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    z-index: 10;
}

.content {
    background: var(--antique);
    border-radius: 5px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 480px;
    margin: 0 auto;
    padding: 1rem;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.35s ease;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>