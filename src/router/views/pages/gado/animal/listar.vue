<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import PageHeader from '@components/page-header'

export default {
    page: {
        title: 'Listar Animal',
        meta: [{
            name: 'description',
            content: appConfig.description
        }],
    },
    components: {
        Layout,
        PageHeader
    },
    data() {
        return {
            title: 'Listar Animal',
            animais: [],
            animaisFiltrados: [],
            filtro: ''
        }
    },
    mounted() {

        if (localStorage.animais) {
            this.animais = JSON.parse(localStorage.animais);
            this.animaisFiltrados = this.animais
           
        }
    },
    methods: {
        buscar() {

            this.animaisFiltrados = this.animais.filter((animal) => {
                return animal.tag.toLowerCase().includes(this.filtro.toLowerCase()) ||
                    animal.raca.toLowerCase().includes(this.filtro.toLowerCase()) ||
                    animal.sexo.toLowerCase().includes(this.filtro.toLowerCase())
            });

            if (this.tag == '') this.animaisFiltrados = this.animais
        },

        editar(id) {
            this.$router.push({
                name: 'Cadastro de Animal',
                query: {
                    parametros: {
                        id: id
                    }
                }
            })
        },

        visualizar(id) {
            console.log('Visualizar ', id)
        },

        deletar(id) {
            console.log('Deletou ', id)

            this.$swal.fire({
                position: 'center',
                title: 'Você tem certeza?',
                text: "Ao confirmar o animal será deletado",
                icon: 'warning',
                showCancelButton: true,
                //confirmButtonColor: '#3085d6',
                //cancelButtonColor: '#d33',
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não',
            }).then((result) => {
                if (result.isConfirmed) {
                    //remove da tabela
                    this.animaisFiltrados = this.animais.filter((animal) => {
                        return animal.id != id
                    });

                    //remove do localStorage
                    this.animais = this.animais.filter((animal) => {
                        return animal.id != id
                    });

                    localStorage.animais = JSON.stringify(this.animais);

                    this.$swal.fire({
                        position: 'top-end',
                        title: 'Deletado',
                        text: "Animal deletado com sucesso.",
                        icon: 'success',
                        showConfirmButton: false,
                    })
                }
            })

        }
    },
}
</script>

<template>
<Layout>
    <PageHeader :title="title" />

    <div class="row">

        <div class="col-lg-12">
            <div class="card">
                <div class="row p-3">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="tag">
                                Filtro
                            </label>
                            <input id="filtro" v-model="filtro" name="filtro" class="form-control" type="text" placeholder="Filtre pela Tag, Raça ou Sexo" />
                        </div>
                    </div>
                    <div class="col-md-4 mt-2">
                        <div class="form-group mt-3">
                            <button class="btn btn-warning" type="button" @click="buscar()">Buscar</button>
                        </div>
                    </div>

                </div>

                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-striped mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">#Tag</th>
                                    <th scope="col">Idade</th>
                                    <th scope="col">Peso</th>
                                    <th scope="col">Raça</th>
                                    <th scope="col">Sexo</th>
                                    <th scope="col" class="text-center">Opções</th>

                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="animal in animaisFiltrados">
                                    <th scope="row">{{animal.tag}}</th>
                                    <td>{{animal.idade}}</td>
                                    <td>{{animal.peso}}</td>
                                    <td>{{animal.raca}}</td>
                                    <td>{{animal.sexo}}</td>
                                    <td class="text-center">
                                        <b-dropdown variant="light" size="sm">
                                            <template slot="button-content">
                                                <feather type="menu"></feather>
                                            </template>
                                            <b-dropdown-item @click="editar(animal.id)">Editar</b-dropdown-item>
                                            <b-dropdown-item @click="visualizar(animal.id)">Visualizar</b-dropdown-item>
                                            <b-dropdown-item @click="deletar(animal.id)">Deletar</b-dropdown-item>
                                        </b-dropdown>
                                    </td>
                                </tr>
                                <tr v-show="animaisFiltrados.length == 0">
                                    <td colspan="6" class="text-center font-weight-bold">
                                        <h5>Nenhum Animal Encontrado</h5>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- end row -->
</Layout>
</template>
