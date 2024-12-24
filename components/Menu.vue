<template>
    <nav v-if="!isMobile" id="navMenu">
        <h1>Pavel Kadaňka</h1>
        <a @mouseover="menuChangeColor($event)" @mouseout="menuResetColor($event)" class="navMenuItem" href="/">Home</a>
        <a @mouseover="menuChangeColor($event)" @mouseout="menuResetColor($event)" class="navMenuItem"
            href="/projects">Projects</a>
        <a @mouseover="menuChangeColor($event)" @mouseout="menuResetColor($event)" class="navMenuItem"
            href="/about">About</a>
    </nav>
    <div v-else id="navMenuMobile">
        <div class="navbar">
            <div class="container nav-container">
                <input class="checkbox" type="checkbox" @change="showMenu($event)" />
                <div class="hamburger-lines">
                    <span class="line line1"></span>
                    <span class="line line2"></span>
                    <span class="line line3"></span>
                </div>
            </div>
        </div>
        <div class="menu-items">
            <li><a href="/">Home</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/about">About</a></li>
        </div>
        <h1>Pavel Kadaňka</h1>
    </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

h1 {
    width: 100%;
    font-size: 30px;
    color: white;
    display: block;
    font-family: Joti One;
}

#navMenu {
    display: flex;
    justify-content: left;
    gap: 50px;
    width: 100%;
}

#navMenu a {
    color: white;
    text-decoration: none;
    margin: 0 10px;
    font-size: 22px;
    transition: all 0.3s ease;
    font-family: Kode Mono;
}

#navMenuMobile {
    display: flex;
    flex-direction: row;
    width: 100%;
    overflow-x: hidden;
}

.nav-container .checkbox {
    position: absolute;
    display: block;
    height: 32px;
    width: 32px;
    z-index: 5;
    opacity: 0;
    cursor: pointer;
}

.nav-container .hamburger-lines {
    display: block;
    height: 36px;
    width: 42px;
    position: absolute;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.nav-container .hamburger-lines .line {
    display: block;
    height: 6px;
    width: 100%;
    border-radius: 10px;
    background: #ffffff;
}

.navbar {
    display: flex;
    justify-content: space-between;
    padding: 20px;
}

.menu-items {
    position: absolute;
    background-color: #ffffff;
    height: 100vh;
    width: 100%;
    padding: 60px 20px;
    transition: transform 0.5s ease-in-out;
    text-align: right;
    text-decoration: none;
    list-style: none;
    transform: translateX(-150%);
    z-index: 1;
    /* or any negative value like -1 if needed */
}

.menu-items li a {
    color: black;
    text-decoration: none;
    font-family: Kode Mono;
}

.menu-items li {
    font-size: 1.5rem;
    font-weight: 500;
}


@media (max-width: 960px) {
    h1 {
        font-size: 25px;
        width: 100%;
        text-align: right;
        padding: 20px;
    }
}
</style>


<script>
import { useDisplay } from 'vuetify';

export default {
    setup() {
        const display = useDisplay(); // Access reactive display values
        return {
            display, // Make the display object available in the template or logic
        };
    },
    data() {
        return {
            isMobile: false, // Initialize `isMobile`
        };
    },
    methods: {
        menuChangeColor(event) {
            if (event) {
                event.target.style.color = "#f08bedfa";
            }
        },
        menuResetColor(event) {
            if (event) {
                event.target.style.color = "white";
            }
        },
        updateLayout() {
            // Use reactive display properties for layout updates
            this.isMobile = this.display.smAndDown;
        },
        showMenu(event) {
            let mobileMenu = document.querySelector('.menu-items');
            const isChecked = event.target.checked;

            if (event.target.checked) {
                mobileMenu.style.transform = 'translateX(-60%)';
            } else {
                mobileMenu.style.transform = 'translateX(-120%)';
            }

            if (isChecked) {
                this.menuAnimationIn();
            } else {
                this.menuAnimationReset();
            }
        },
        menuAnimationIn() {
            let line1 = document.querySelector(".nav-container .hamburger-lines .line1");
            let line2 = document.querySelector(".nav-container .hamburger-lines .line2");
            let line3 = document.querySelector(".nav-container .hamburger-lines .line3");

            // Set the transform origin to the center of the elements
            line1.style.transformOrigin = "center";
            line3.style.transformOrigin = "center";

            // Apply the first transform (translateY)
            line1.style.transition = "transform 0.5s";
            line2.style.transition = "transform 0.5s";
            line3.style.transition = "transform 0.5s";

            // Translate lines
            line1.style.transform = `translateY(15px)`;
            line3.style.transform = `translateY(-15px)`;

            // Add a delay for rotation
            setTimeout(() => {
                line1.style.transform = `translateY(15px) rotate(45deg)`;
                line1.style.background = `#0e2431`
                line2.style.display = `none`;
                line3.style.transform = `translateY(-15px) rotate(-45deg)`;
                line3.style.background = `#0e2431`
            }, 500); // Delay for 0.5s
        },
        menuAnimationReset() {
            let line1 = document.querySelector(".nav-container .hamburger-lines .line1");
            let line2 = document.querySelector(".nav-container .hamburger-lines .line2");
            let line3 = document.querySelector(".nav-container .hamburger-lines .line3");

            line1.style.transformOrigin = "center";
            line3.style.transformOrigin = "center";

            line1.style.transition = "transform 0.5s";
            line2.style.transition = "transform 0.5s";
            line3.style.transition = "transform 0.5s";
            line1.style.transform = `translateY(15px) rotate(0deg)`;
            line3.style.transform = `translateY(-15px) rotate(0deg)`;

            setTimeout(() => {
                line2.style.display = `block`;
                line1.style.transform = `translateY(0) rotate(0deg)`;
                line1.style.background = `#FFFFFF`;
                line3.style.transform = `translateY(0) rotate(0deg)`;
                line3.style.background = `#FFFFFF`;
            }, 500);
        }
    },
    mounted() {
        this.updateLayout(); // Check layout on mount
        window.addEventListener("resize", this.updateLayout); // Update on resize
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.updateLayout); // Clean up event listener
    },
};
</script>
