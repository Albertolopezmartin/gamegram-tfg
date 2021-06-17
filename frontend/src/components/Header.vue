<template>
    <header id="header">
        <div class="center">
        <!-- LOGO -->
            <div id="logo">
                <img src="../assets/logo.png" class="app-logo" alt="Logotipo">
                <span id="brand">
                    <strong>GAMEGRAM</strong>
                </span>
            </div>
        <!-- MENU -->
            <nav id="menu">
                <ul>
                    <li>
                        <router-link to="/home" active-class="active">Inicio</router-link>
                    </li>
                    <li>
                        <router-link to="/games" active-class="active">Juegos</router-link>
                    </li>
                    <li>
                        <router-link to="/posts" active-class="active">Fotos</router-link>
                    </li>
                    <li>
                        <router-link to="/perfil" active-class="active">Perfil</router-link>
                    </li>
                    <li>
                        <router-link to="/login" active-class="active">Login</router-link>
                    </li>
                    <li>
                        <router-link to="/register" active-class="active">Registrar</router-link>
                    </li>
                    <li>
                        <router-link to="/logout" active-class="active">Logout</router-link>
                    </li>
                </ul>
            </nav>

            <!--LIMPIAR FLOATADOS-->
            <div class="clearfix"></div>
        </div>
    </header>
</template>

<script>
export default {
    name:'Header'
}
</script>