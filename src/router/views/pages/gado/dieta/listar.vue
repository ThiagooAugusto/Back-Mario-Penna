<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import PageHeader from '@components/page-header'

export default {
    page: {
        title: 'Listar Dieta',
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
            title: 'Listar Dieta',
            filtro:''
        }
    },
    mounted() {

        
    },
    methods: {
        buscar() {

           
        },

        editar(id) {
            
        },


        deletar(id) {
            

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
                                <tr >
                                    <th scope="row">1</th>
                                    <td>20</td>
                                    <td>458</td>
                                    <td>Nelore</td>
                                    <td>Macho</td>
                                    <td class="text-center">
                                        <b-dropdown variant="light" size="sm">
                                            <template slot="button-content">
                                                <feather type="menu"></feather>
                                            </template>
                                            <b-dropdown-item @click="editar(animal.id)">Editar</b-dropdown-item>
                                            <b-dropdown-item @click="deletar(animal.id)">Deletar</b-dropdown-item>
                                        </b-dropdown>
                                    </td>
                                </tr>
                                <tr >
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
