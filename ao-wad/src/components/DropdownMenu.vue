<template>
    <!-- This is the same html code that was in all 3 .html files, now it's seperated into a component so it's easier to use and change. -->
    <div id="dropdownMenu" class="dropdownMenu" v-show="menuVisible" @click.stop>
        <p>John Doe</p>
        <p>john.doe@ut.ee</p>
        <p>logout</p>
    </div>
</template>

<script>
// Export the logic for this component for vue
export default {
    name: "DropdownMenu", // Optional
    data() { // We need to remember the visibility of the menu - false by default
        return {
            menuVisible: false
        }
    },
    methods: { // Methods to use in listeners
        toggleMenu(event) {
            event.stopPropagation();
            this.menuVisible = !this.menuVisible;
        }
        /*
        closeMenu() {
            this.menuVisible = false;
        }*/
    },
    mounted() { // This runs after the component has been added to the DOM
        // Event listeners

        const logo = document.getElementById('logo');
        if (logo) {
            logo.addEventListener("click", this.toggleMenu);
        }
        /*
        window.addEventListener("click", this.closeMenu); // Was in the previous code, don't remember if we wanted this
        */
    },
    beforeUnmount() {
        // Clean up event listeners

        const logo = document.getElementById('logo');
        if (logo) {
            logo.removeEventListener("click", this.toggleMenu);
        }
        /*
        window.removeEventListener("click", this.closeMenu);
        */
    }
};
</script>

<style>
/* All the styles related to dropdownmenu - I cut it here from .css fies */


.dropdownMenu {
    position: absolute;
    top: 70px;
    right: 10px;
    background-color: #d9d9d9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 10px;
    border-radius: 5px;
    z-index: 1;
}

.dropdownMenu p {
    margin: 0;
    padding: 7px;
    text-decoration: none;
    display: block;
    color: black;
    font-weight: normal;
}

.dropdownMenu a:hover {
    background-color: #bfbfbf;
}
</style>