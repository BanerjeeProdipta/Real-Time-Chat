<template>
<div>

    <div v-if="user === 'me'" class="d-flex flex-row-reverse">
        <li class="list-group-item" :class="className"><slot></slot></li>
    </div>

    <div v-if="user !== 'me'" class="d-flex flex-row">
        <li class="list-group-item"><slot></slot></li>
    </div>

</div>
</template>

<script>
    export default {
        props: [
            'color',
            'user',
            'typing'
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
