<template>
  <v-app>
    <v-content>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12 sm10>
            <v-layout row wrap>
              <v-flex xs12 sm4 v-for="item in savedItems" :key="item">
                <v-card>{{ item }}</v-card>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 sm2>
            <v-layout row wrap>
              <v-flex xs12>
                <v-btn @click="openDialog" block color="primary" round dark>Change</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-dialog v-model="dialog" persistent scrollable max-width="500px">
      <v-card>
        <v-card-title class="primary white--text headline">Select Item</v-card-title>
        <v-card-title class="">
          <v-layout grid-list-sm>
            <v-flex xs6>
              <v-text-field height="30px" hide-details
                label="Input for search"
                v-model="searchWord"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-select height="30px" hide-details
                :items="selectFilter"
                label="Item filter"
                v-model="select"
              ></v-select>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <div v-for="item in filteredList" :key="item" class="wg-container">
            <v-checkbox v-model="selectedItems" :label="item" :value="item" :disabled="isDisabled"></v-checkbox>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text style="height: 125px;">
          <v-container grid-list-lg>
            <v-layout row wrap>
              <v-flex xs4 v-for="(item, index) in selectedItems" :key="item">
                <v-card>
                    <p class="text-md-center">
                      <span>{{ item }}</span>
                      <v-icon @click="remove(item, index)">cancel</v-icon>
                    </p>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click.native="cancel">Cancel</v-btn>
          <v-btn color="primary darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-app>
</template>

<script>
import { createItems } from './../helpers/createItem';
  export default {
    created(){
      this.items = createItems();
    },
    computed: {
      isDisabled() {
        return this.selectedItems.length >= 3;
      },
      filteredList() {
        let search = this.searchWord;
        return this.items.filter((item, index) => {
          if(search === '') return true;
          else return item.indexOf(search) > -1 && index >= this.select-1;
        });
      }
    },
    data () {
      return {
        searchWord: '',
        savedItems: [],
        dialog: false,
        items: [],
        selectedItems: [],
        selectFilter: [
          { value: '', text: 'Without filter' },
          { value: 10, text: '> 10' },
          { value: 50, text: '> 50' },
          { value: 100, text: '> 100' },
        ],
        select: ''
      }
    },
    methods: {
      openDialog() {
        if (this.savedItems.length) {
          this.selectedItems = this.savedItems.slice(0);
        }
        this.dialog=!this.dialog;
      },
      remove(item, index) {
        this.selectedItems.splice(index, 1);
      },
      save() {
        this.savedItems = this.selectedItems.slice(0);
        this.dialog = false;
      },
      cancel() {
        this.selectedItems = [];
        this.dialog = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  /* overide vuetify styles */
  .wg-container {
    .v-input {
      margin-top: 0px;
    }
  }
</style>