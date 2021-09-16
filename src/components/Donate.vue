<template>
    <div id='donate' @click='clickToCancel'>
        <div id='modal'>
            <h4>Enjoying Lychee List?</h4>
            <p>
                Hey there! I'm 
                <a class='link' href='https://niftyoctopus.com'>NiftyOctopus</a> 
                and I create little web apps in my spare time.
                If you are enjoying Lychee List, please consider supporting my work with a small donation.
                Thank you!
            </p>

            <a href='https://www.buymeacoffee.com/niftyoctopus' class='button'><button>Donate</button></a>
            <div class='small'>Takes you to buymeacoffee.com</div>

            <div class='button' @click='cancel'><button>Maybe Later</button></div>
        </div>
    </div>
</template>



<script>
    export default {
        name: 'donate',
        methods: {
            clickToCancel(event) {
                if(event.target.id == 'donate') {
                    this.$emit('cancel')
                }
            },
            cancel() {
                this.$emit('cancel')
            }
        }
    }
</script>



<style scoped>
    #donate {
        z-index:  1000;
        position: fixed;
        top:      0;
        left:     0;
        bottom:   0;
        right:    0;
        
        display:         flex;
        justify-content: center;
        align-items:     center;

        background-color: rgba(0, 0, 0, 0.5);
    }

    #modal {
        max-width: 75%;
        padding: 10px;
        background-color: white;
        border: 1px solid black;
        border-radius: 3px;
        display: flex;
        flex-flow:       column nowrap;
        justify-content: center;
        align-items:     stretch;
    }

    h4 {
        margin: 0;
    }

    p {
        text-align: left;
        font-size: 16px;
        padding: 0 5px;
    }

    button {
        background: none;
        border: none;
    }

    .button {
        margin-top: 10px;
        border: 1px solid gray;
        padding: 5px 10px;
        border-radius: 3px;
        background-color: lightgray;
    }

    .small {
        font-size: 12px;
        color: gray;
    }
</style>