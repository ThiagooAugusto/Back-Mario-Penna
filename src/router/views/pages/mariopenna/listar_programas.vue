<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import PageHeader from '@components/page-header'

export default {
    page: {
        title: 'Listar Programa de Residência',
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
            title: 'Listar Programa de Residência',
            programas: [],
            programasFiltrados: [],
            filtro: ''
        }
    },
    mounted() {

        if (localStorage.programas) {
            this.programas = JSON.parse(localStorage.programas);
            this.programasFiltrados = this.programas
           
        }
    },
    methods: {
        buscar() {

            this.programasFiltrados = this.programas.filter((programa) => {
                return programa.descricao.toLowerCase().includes(this.filtro.toLowerCase())
            });

            if (this.descricao == '') this.programasFiltrados = this.programas
        },

        editar(id) {
            //TODO: IMPLEMENTAR
        },

        visualizar(id) {
            console.log('Visualizar ', id)
        },

        deletar(id) {
            console.log('Deletou ', id)

            this.$swal.fire({
                position: 'center',
                title: 'Você tem certeza?',
                text: "Ao confirmar o programa será deletado",
                icon: 'warning',
                showCancelButton: true,
                //confirmButtonColor: '#3085d6',
                //cancelButtonColor: '#d33',
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não',
            }).then((result) => {
                if (result.isConfirmed) {
                    //Implementar

                    this.$swal.fire({
                        position: 'top-end',
                        title: 'Deletado',
                        text: "Programa deletado com sucesso.",
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
                            <input id="filtro" v-model="filtro" name="filtro" class="form-control" type="text" placeholder="Filtre pela Descrição" />
                        </div>
                    </div>
                    <div class="col-md-4 mt-2">     
                        <div class="form-group mt-3 justify-content-end">
                            <button class="btn btn-warning" type="button" @click="buscar()">Buscar</button>
                        </div>
                    </div>
                    <div class="col-md-4 mt-2 justify-content-end">     
                        <div class="form-group mt-3 float-right justify-content-end">
                            <button class="btn  btn-primary " type="button" @click="cadastrar()">Cadastrar</button>
                        </div>
                    </div>

                </div>

                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-striped mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">Descrição</th>
                                    <th scope="col" class="text-center">Opções</th>

                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="programa in programasFiltrados">
                                    <th scope="row">{{programa.descricao}}</th>
                                    <td class="text-center">
                                        <b-dropdown variant="light" size="sm">
                                            <template slot="button-content">
                                                <feather type="menu"></feather>
                                            </template>
                                            <b-dropdown-item @click="editar(programa.id)">Editar</b-dropdown-item>
                                            <b-dropdown-item @click="deletar(programa.id)">Deletar</b-dropdown-item>
                                        </b-dropdown>
                                    </td>
                                </tr>
                                <tr v-show="programasFiltrados.length == 0">
                                    <td colspan="6" class="text-center font-weight-bold">
                                        <h5>Nenhum Programa Encontrado</h5>
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
