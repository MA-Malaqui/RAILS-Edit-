<script setup>
// Get user info from session
let user;
try {
    user = await useFetch("/api/user/me");
} catch (error) {
    // Error handling
    console.log(error);
    await navigateTo("/login");
}

// Redirect if user has a wrong role
if (user.data.value.role === "STUDENT") {
    await navigateTo("/student");
}

// Toggle menu for mobile
const showMenu = ref(false);
async function toggleMenu() {
    showMenu.value = !showMenu.value;
}

// Make user info available to children pages through provide/inject (so that they dont have to request it again)
provide("user", user.data.value);
</script>

<template>
    <div>
        <!-- Desktop Layout -->
        <div class="hidden md:flex md:flex-row">
            <div class="flex basis-[15.276146%] flex-col md:block">
                <!-- Taken from figma 260/1702-->
                <div class="sticky top-0">
                    <UserTeacherNavBar />
                </div>
            </div>
            <div class="basis-[84.723854%]">
                <slot v-if="user.data.value" />
            </div>
        </div>

        <!-- Mobile Layout -->
        <div class="md:hidden">
            <UButton
                v-if="!showMenu"
                icon="i-charm-menu-hamburger"
                @click="toggleMenu"
                class="fixed bottom-7 right-7 z-10 md:hidden"
                size="xl"
            />
            <UButton
                v-else
                icon="i-material-symbols-cancel"
                @click="toggleMenu"
                class="fixed bottom-7 right-7 z-10 md:hidden"
                size="xl"
            />
            <div
                v-if="showMenu"
                class="z-9 fixed left-0 top-0 h-full w-full bg-black bg-opacity-50"
                v-auto-animate
            >
                <div class="absolute left-0 top-0 h-full w-[50%]">
                    <UserTeacherNavBar />
                </div>
            </div>
            <div>
                <slot v-if="user.data.value" />
            </div>
        </div>
    </div>
</template>
