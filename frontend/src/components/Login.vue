<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()
const email = ref("");
const password = ref("");
const emailError = ref("");
const passwordError = ref("");

const showPassword = ref(false); //unchecked
const login = async () => {
  emailError.value = "";
  passwordError.value = "";

  if (!email.value) {
    emailError.value = "Email is required";
  }
  if (!password.value) {
    passwordError.value = "Password is required";
  }

  if (emailError.value || passwordError.value) {
    return;
  }

  const response = await fetch("http://localhost:5000/api/login",{
    method: "POST",
    headers:{
      "Content-Type":"application/json"
    },
    credentials: "include",
    body:JSON.stringify({
      email: email.value,
      password: password.value
    })
  })
  const data = await response.json()
  console.log(data);

  if(!response.ok){
    passwordError.value = data.message || "login failed"
    return;
  }
  console.log("Login successful")
  router.push("/dashboard")
};
</script>

<template>
  <div
    class="min-h-screen w-full bg-cover bg-no-repeat bg-center flex items-center justify-center"
    :style="{ backgroundImage: `url('/auth-wallpaper.jpg')` }"
  >
    <!--login form  -->
    <form 
    @submit.prevent="login"
    class="w-100 p-8 bg-transparent">
      <h1
        class="flex justify-center items-center p-2 mb-2 font-bold text-[#e02c7d] text-3xl"
      >
        Welcome back 😉
      </h1>
      <div id="input-fields" class="flex flex-col gap-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          id="email"
          autocomplete="email"
          class="p-4 bg-[#F5EFF2] rounded-3xl outline-none text-[#e02c7d] shadow-[5px_5px_0px_0px_#756B7A]"
        />
        <div class="min-h-5"><p v-if="emailError" class="text-sm text text-red-500">{{ emailError }}</p></div>
        
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          id="password"
          placeholder="Password"
          class="p-4 bg-[#F5EFF2] rounded-3xl outline-none text-[#e02c7d] shadow-[5px_5px_0px_0px_#756B7A]"
        />
        <div class="min-h-5"><p v-if="passwordError" class="text-sm text-red-500">{{ passwordError }}</p></div>
        
        <div class="flex justify-between items-center text-xs text-[#e02c7d]">
          <!-- Left Group: Checkbox + Label stacked tightly together -->
          <div class="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              id="show-password"
              v-model="showPassword"
              class="w-4 h-4 accent-[#e02c7d] cursor-pointer"
            />
            <label for="show-password" class="cursor-pointer select-none">
              Show password
            </label>
          </div>

          <!-- Right Item -->
          <a href="#" class="hover:underline">Forgot password?</a>
        </div>

        <button
          type="submit"
          class="bg-[#DF82A7] hover:bg-[#D7749B] text-xl shadow-[5px_5px_0px_0px_#6E5F70] cursor-pointer text-white w-full p-2.5 rounded-3xl font-bold active:translate-x-[5px] active:translate-y-[5px] transition-all"
        >
          Log in
        </button>

        <p class="flex justify-center items-center gap-1.5">
          <span class="">Don't have an account ?</span>
          <a href="/signup" class="text-[#e02c7d] hover:underline">Sign up</a>
        </p>
      </div>
    </form>
  </div>
</template>
