<template>
  <Loader v-if="loadings.person"/>
  <p v-else-if="errors.person">{{ errors.person }}</p>
  <div
    v-else
    class="person"
  >
    <h1 class="person__name">{{ person.name }}</h1>
    <DataList
      :data="person"
      :keys-to-show="[
        'gender', 'birth_year', 'skin_color', 'eye_color', 'hair_color', 'height', 'mass'
      ]"
    />
    <h2 class="person__list-title">Films</h2>
    <Loader v-if="loadings.films" />
    <p v-else-if="errors.films">{{ errors.films }}</p>
    <DataList
      v-else
      :data="films"
    />
  </div>
</template>

<script>
import DataList from '@/components/DataList'
import Loader from '@/components/Loader'

export default {
  name: 'person-view',
  components: { DataList, Loader },
  props: {
    id: String
  },
  data: () => ({
    loadings: {
      person: false,
      films: false
    },
    errors: {
      person: '',
      films: ''
    }
  }),
  async created () {
    await this.fetchPerson()
    await this.fetchFilms()
  },
  computed: {
    person () {
      return this.$store.getters['people/getById'](this.id)
    },
    films () {
      return this.person && this.person.films
        .map(this.$store.getters['films/getById'])
        .filter(Boolean)
        .sort((a, b) => a.episode_id - b.episode_id)
        .reduce((films, film) => {
          films[`Episode ${film.episode_id}`] = film.title
          return films
        }, {})
    }
  },
  methods: {
    async fetchPerson () {
      this.loadings.person = true
      try {
        await this.$store.dispatch('people/fetchOne', this.id)
      } catch (e) {
        this.errors.person = e.message
      } finally {
        this.loadings.person = false
      }
    },
    async fetchFilms () {
      this.loadings.films = true
      try {
        await Promise.all(this.person.films.map((id) => {
          return this.$store.dispatch('films/fetchOne', id)
        }))
      } catch (e) {
        console.error(e)
        this.errors.films = e.message
      } finally {
        this.loadings.films = false
      }
    }
  }
}
</script>

<style>

.person {
  opacity: 0;
  transform: translate3d(0, 2em, 0);
  animation: person 0.25s ease-out forwards;
}

.person__name {
  font-size: 3em;
  color: var(--color-primary);
}

.person__list-title {
  margin: 2em 0 1em;
  color: var(--color-primary);
}

@keyframes person {
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

</style>
