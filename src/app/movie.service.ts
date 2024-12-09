import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { MaxValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }

  private movies: Movie[] = [

    {id: 1, title:'Inception',genre:'Sci-Fi',year: 2017},
    {id: 2, title:'InterStellar',genre:'Sci-Fri',year: 2019},
    {id: 3, title:'Dark Knight', genre:'Action',year: 2012},
    {id: 4, title:'JohnWick',genre:'Crime', year: 2016},
    {id: 5, title:'Asursar', genre:'Crome', year: 2021},
    {id: 6, title:'Davilkake',genre: 'Action',year: 2022},

  ]


  getmovies(): Movie[] {
    return this.movies;
  }

  addmovies(movie:Movie):void {
    // first we check if our id is not null or not undefined
    const moviesids = this.movies.map(m=>m.id).filter(id=>id!==undefined) as number[]
    // we increase the id automcatically
    movie.id = this.movies.length ? Math.max(...moviesids) + 1:1;
    this.movies.push(movie);
  }

  updatemovies(updatemovie: Movie):void{
    // here we find index of Movies object id
    const index = this.movies.findIndex(m=>m.id == updatemovie.id);
    if(index!=-1){
      this.movies[index]=updatemovie
    }
  }

  deletemovies(id:number): void{
    // we delete movie by id basis
    this.movies=this.movies.filter(movie=>movie.id !== id);
  }
}
