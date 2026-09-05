<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const phoneNumber = ref("");
const password = ref("");
const confirmPassword = ref("");

const showPassword = ref(false);

const firstNameError = ref("");
const lastNameError = ref("");
const emailError = ref("");
const phoneNumberError = ref("");
const passwordError = ref("");
const confirmPasswordError = ref("");

const signup = async () => {
  console.log("Signup button clicked");
  // Clear previous errors
  firstNameError.value = "";
  lastNameError.value = "";
  emailError.value = "";
  phoneNumberError.value = "";
  passwordError.value = "";
  confirmPasswordError.value = "";

  // First name
  if (!firstName.value.trim()) {
    firstNameError.value = "First name is required";
  }

  // Last name
  if (!lastName.value.trim()) {
    lastNameError.value = "Last name is required";
  }

  // Email
  if (!email.value.trim()) {
    emailError.value = "Email is required";
  }

  // Phone
  if (!phoneNumber.value.trim()) {
    phoneNumberError.value = "Phone number is required";
  }

  // Password
  if (!password.value) {
    passwordError.value = "Password is required";
  } else if (password.value.length < 8) {
    passwordError.value = "Password must be at least 8 characters";
  }

  // Confirm password
  if (!confirmPassword.value) {
    confirmPasswordError.value = "Please confirm your password";
  } else if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = "Passwords do not match";
  }

  // Stop if there are errors
  if (
    firstNameError.value ||
    lastNameError.value ||
    emailError.value ||
    phoneNumberError.value ||
    passwordError.value ||
    confirmPasswordError.value
  ) {
    return;
  }
  //send data to backend
  try {
    const response = await fetch("http://localhost:5000/api/signup",{
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        password: password.value
      })
    })
     const data = await response.json()
     console.log(data)
     router.push("/login")
  } catch (error) {
    console.error("Signup failed:", error);
  }
};
</script>

<template>
  <div
    class="min-h-screen w-full bg-cover bg-no-repeat bg-center flex items-center justify-center px-4 py-6"
    :style="{ backgroundImage: `url('/auth-wallpaper.jpg')` }"
  >
    <!-- Signup Form -->
    <form
      @submit.prevent="signup"
      class="w-full max-w-md px-5 py-4 sm:px-5 sm:py-6"
    >
      <!-- Heading -->
      <h1
        class="flex justify-center items-center mb-5 font-bold text-[#e02c7d] text-3xl sm:text-4xl"
      >
        Who's this ?
      </h1>

      <div class="flex flex-col gap-3 md:gap-5">

        <!-- First Name -->
        <div>
          <input
            v-model="firstName"
            type="text"
            placeholder="First name"
            id="first-name"
            autocomplete="given-name"
            required
            class="w-full p-3.5 bg-[#F5EFF2] rounded-3xl outline-none text-[#e02c7d] shadow-[5px_5px_0px_0px_#756B7A]"
          />

          <p
            v-if="firstNameError"
            class="text-xs text-red-500 mt-1 ml-4"
          >
            {{ firstNameError }}
          </p>
        </div>

        <!-- Last Name -->
        <div>
          <input
            v-model="lastName"
            type="text"
            placeholder="Last name"
            id="last-name"
            autocomplete="family-name"
            required
            class="w-full p-3.5 bg-[#F5EFF2] rounded-3xl outline-none text-[#e02c7d] shadow-[5px_5px_0px_0px_#756B7A]"
          />

          <p
            v-if="lastNameError"
            class="text-xs text-red-500 mt-1 ml-4"
          >
            {{ lastNameError }}
          </p>
        </div>

        <!-- Email -->
        <div>
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            id="email"
            autocomplete="email"
            required
            class="w-full p-3.5 bg-[#F5EFF2] rounded-3xl outline-none text-[#e02c7d] shadow-[5px_5px_0px_0px_#756B7A]"
          />

          <p
            v-if="emailError"
            class="text-xs text-red-500 mt-1 ml-4"
          >
            {{ emailError }}
          </p>
        </div>

        <!-- Phone -->
        <div>
          <input
            v-model="phoneNumber"
            type="tel"
            placeholder="Phone number"
            id="phone-number"
            autocomplete="tel"
            required
            class="w-full p-3.5 bg-[#F5EFF2] rounded-3xl outline-none text-[#e02c7d] shadow-[5px_5px_0px_0px_#756B7A]"
          />

          <p
            v-if="phoneNumberError"
            class="text-xs text-red-500 mt-1 ml-4"
          >
            {{ phoneNumberError }}
          </p>
        </div>

        <!-- Password -->
        <div>
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            id="password"
            autocomplete="new-password"
            minlength="8"
            required
            class="w-full p-3.5 bg-[#F5EFF2] rounded-3xl outline-none text-[#e02c7d] shadow-[5px_5px_0px_0px_#756B7A]"
          />

          <p
            v-if="passwordError"
            class="text-xs text-red-500 mt-1 ml-4"
          >
            {{ passwordError }}
          </p>
        </div>

        <!-- Confirm Password -->
        <div>
          <input
            v-model="confirmPassword"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Confirm password"
            id="confirm-password"
            autocomplete="new-password"
            required
            class="w-full p-3.5 bg-[#F5EFF2] rounded-3xl outline-none text-[#e02c7d] shadow-[5px_5px_0px_0px_#756B7A]"
          />

          <p
            v-if="confirmPasswordError"
            class="text-xs text-red-500 mt-1 ml-4"
          >
            {{ confirmPasswordError }}
          </p>
        </div>

        <!-- Show Password -->
        <div class="flex items-center gap-1.5 cursor-pointer text-[#e02c7d]">
          <input
            v-model="showPassword"
            type="checkbox"
            id="show-password"
            class="w-4 h-4 accent-[#e02c7d] cursor-pointer"
          />

          <label
            for="show-password"
            class="cursor-pointer select-none text-sm"
          >
            Show password
          </label>
        </div>

        <!-- Signup Button -->
        <button
          type="submit"
          class="bg-[#DF82A7] hover:bg-[#D7749B] text-lg sm:text-xl shadow-[5px_5px_0px_0px_#6E5F70] cursor-pointer text-white w-full p-3 rounded-3xl font-bold active:translate-x-[5px] active:translate-y-[5px] transition-all mt-1"
        >
          Sign up
        </button>

      </div>
    </form>
  </div>
</template>