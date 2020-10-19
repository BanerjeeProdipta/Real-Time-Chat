<template>
<div>
    <div v-if="user === 'me'" class="d-flex align-items-center flex-row-reverse mr-2 mt-2 x">
        <div class="ml-1">
            <img
                src="images/me.jpeg"
                alt=""
                class="rounded-circle"
                style="object-fit:cover; border-radius:50%; width:50px; height:50px;"
            > 
        </div>
        <li class="list-group-item" :class="className"><slot></slot><small class="text-muted ml-2">{{time}}</small></li>
    </div>

    <div v-if="user !== 'me'" class="d-flex flex-row align-items-center ml-2 mt-2">
        <div class="mr-1">
            <img
                src="images/you.jpeg"
                alt=""
                class="rounded-circle"
                 style="object-fit:cover; border-radius:50%; width:50px; height:50px;"
            > 
        </div>
        <li class="list-group-item"><slot></slot><small class="text-muted ml-2">{{time}}</small></li>
    </div>

</div>
</template>

<script>
    export default {
        props: [
            'color',
            'user',
            'typing',
            'time'
        ],
        computed: {
            className() {
                return 'list-group-item-'+this.color;
            }
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
