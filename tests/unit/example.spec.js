import MoviePanel from "@/components/MoviePanel";
import Home from "../../src/views/Home";
import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
//In order to solve fetch errors on mount
global.fetch = require("node-fetch");
const localVue = createLocalVue();

export function getDataTestSelector(dataTest) {
  return `[data-test=${dataTest}]`;
}

it("A single call to searchRequest is performed on Home view mount", () => {
  const searchRequest = jest.fn();
  shallowMount(Home, {
    methods: {
      searchRequest
    }
  });
  expect(searchRequest).toBeCalledTimes(1);
});

it("The initial data for Home view is correct", () => {
  const wrapper = shallowMount(Home);
  expect(wrapper.vm.$data.movies).toBe(null);
  expect(wrapper.vm.$data.selectedID).toBe(null);
  expect(wrapper.vm.$data.selectedMovieData).toBe(null);
  wrapper.destroy();
});

it("Initial prop for MoviePanel is undefined", () => {
  const wrapper = shallowMount(MoviePanel);
  expect(wrapper.props("selectedMovieData")).toBe(undefined);
  wrapper.destroy();
});

it("The Home view shows one list element for the movie retrieved", async () => {
  const wrapper = shallowMount(Home, {
    data: function() {
      return {
        movies: {
          items: {
            0: {
              id: "tt0848228",
              title: "The Avengers",
              genres: ["Action", "Adventure", "Sci-Fi"],
              type: "movie",
              averageRating: "8.0",
              votes: "1,263,208",
              startYear: 2015,
              endYear: 2019
            }
          }
        }
      };
    }
  });
  const divOfList = wrapper.find("#list-of-movies");
  expect(divOfList.exists()).toBe(true);
  expect(divOfList.find("li.movie-list-element").exists()).toBe(true);
  wrapper.destroy();
});

it("The Home view shows a list element for each movie retrieved", async () => {
  const wrapper = shallowMount(
    Home,
    {
      data: function() {
        return {
          movies: {
            0: {
              id: "tt0848228",
              title: "The Avengers",
              genres: ["Action", "Adventure", "Sci-Fi"],
              type: "movie",
              averageRating: "8.0",
              votes: "1,263,208",
              startYear: 2015,
              endYear: 2019
            },
            1: {
              id: "tt4154756",
              title: "Avengers: Infinity War",
              genres: ["Action", "Adventure", "Sci-Fi"],
              type: "movie",
              averageRating: "8.4",
              votes: "839,788",
              startYear: 2015,
              endYear: 2019
            },
            2: {
              id: "tt4154796",
              title: "Avengers: Endgame",
              genres: ["Action", "Adventure", "Drama", "Sci-Fi"],
              type: "movie",
              averageRating: "8.4",
              votes: "816,700",
              startYear: 2015,
              endYear: 2019
            }
          },
          selectedID: null,
          selectedMovieData: null
        };
      }
    },
    localVue
  );
  const divOfList = wrapper.find(getDataTestSelector("list-of-movies"));
  expect(divOfList.exists()).toBe(true);
  expect(wrapper.findAll("li").length).toBe(3);
  const allMovieElements = divOfList.findAll(
    getDataTestSelector("movie-list-link")
  );
  expect(allMovieElements.at(0).text()).toBe(
    wrapper.vm.$data.movies[0].title +
      " (" +
      wrapper.vm.$data.movies[0].startYear +
      ")"
  );
  expect(allMovieElements.at(1).text()).toBe(
    wrapper.vm.$data.movies[1].title +
      " (" +
      wrapper.vm.$data.movies[1].startYear +
      ")"
  );
  expect(allMovieElements.at(2).text()).toBe(
    wrapper.vm.$data.movies[2].title +
      " (" +
      wrapper.vm.$data.movies[2].startYear +
      ")"
  );
  wrapper.destroy();
});

it("Selected id changes when a list element is clicked", async () => {
  const wrapper = shallowMount(
    Home,
    {
      data: function() {
        return {
          movies: {
            0: {
              id: "tt0848228",
              title: "The Avengers",
              genres: ["Action", "Adventure", "Sci-Fi"],
              type: "movie",
              averageRating: "8.0",
              votes: "1,263,208",
              startYear: 2015,
              endYear: 2019
            }
          },
          selectedID: null,
          selectedMovieData: null
        };
      }
    },
    localVue
  );
  const divOfList = wrapper.find(getDataTestSelector("list-of-movies"));
  expect(divOfList.exists()).toBe(true);
  expect(wrapper.findAll("li").length).toBe(1);
  const movieListElement = divOfList.find(
    getDataTestSelector("movie-list-link")
  );
  await movieListElement.trigger("click");
  expect(wrapper.vm.$data.selectedID).toBe(wrapper.vm.$data.movies[0].id);
  wrapper.destroy();
});

it("selectMovie() is called upon click on a movie list element", async () => {
  const selectMovie = jest.fn();
  const wrapper = shallowMount(Home, {
    methods: {
      selectMovie
    },
    data: function() {
      return {
        movies: {
          0: {
            id: "tt0848228",
            title: "The Avengers",
            genres: ["Action", "Adventure", "Sci-Fi"],
            type: "movie",
            averageRating: "8.0",
            votes: "1,263,208",
            startYear: 2015,
            endYear: 2019
          }
        },
        selectedID: null,
        selectedMovieData: null
      };
    }
  });
  const divOfList = wrapper.find(getDataTestSelector("list-of-movies"));
  const movieListElement = divOfList.find(
    getDataTestSelector("movie-list-link")
  );
  await movieListElement.trigger("click");
  expect(selectMovie).toBeCalledTimes(1);
  wrapper.destroy();
});

it("The MoviePanel shows the info about the movie selected", async () => {
  const wrapper = mount(Home, {
    data: function() {
      return {
        movies: {
          0: {
            id: "tt0848228",
            title: "The Avengers",
            genres: ["Action", "Adventure", "Sci-Fi"],
            type: "movie",
            averageRating: "8.0",
            votes: "1,263,208",
            startYear: 2015,
            endYear: 2019
          }
        },
        selectedID: null,
        selectedMovieData: {
          id: "tt0848228",
          title: "The Avengers",
          genres: ["Action", "Adventure", "Sci-Fi"],
          type: "movie",
          averageRating: "8.0",
          votes: "1,263,208",
          startYear: 2015,
          endYear: 2019
        }
      };
    }
  });
  const divOfList = wrapper.find(getDataTestSelector("list-of-movies"));
  const movieListElement = divOfList.find(
    getDataTestSelector("movie-list-link")
  );
  await movieListElement.trigger("click");
  const moviePanelTitle = wrapper
    .find(getDataTestSelector("movie-title"))
    .text();
  const moviePanelType = wrapper.find(getDataTestSelector("movie-type")).text();
  const moviePanelYears = wrapper
    .find(getDataTestSelector("movie-years"))
    .text();
  const moviePanelRating = wrapper
    .find(getDataTestSelector("movie-rating"))
    .text();
  const moviePanelGenres = wrapper.findAll(getDataTestSelector("movie-genres"));

  expect(moviePanelTitle).toBe(wrapper.vm.$data.movies[0].title);
  expect(moviePanelType).toBe(wrapper.vm.$data.movies[0].type);
  expect(moviePanelYears).toBe(
    wrapper.vm.$data.movies[0].startYear +
      " -" +
      "\n" +
      "        " +
      wrapper.vm.$data.movies[0].endYear
  );
  expect(moviePanelRating).toBe(
    wrapper.vm.$data.movies[0].averageRating +
      "/10 out of" +
      "\n" +
      "        " +
      wrapper.vm.$data.movies[0].votes +
      " votes"
  );

  for (let i = 0; i < moviePanelGenres.length; i++) {
    expect(moviePanelGenres.at(i).text()).toBe(
      wrapper.vm.$data.movies[0].genres[i]
    );
  }
  wrapper.destroy();
});
