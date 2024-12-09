import { Component } from '@angular/core';
import { MovieService } from '../movie.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Movie } from '../movie';
import { Title } from '@angular/platform-browser';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit{

  movies: Movie[]=[];
  movieForm: FormGroup;
  selectedmovies: Movie | null=null;
  movieid: number | null=null;

  constructor(private movieservice: MovieService){

    this.movieForm = new FormGroup({
      id: new FormControl(null),
      title: new FormControl(null,Validators.required),
      genre: new FormControl(null,Validators.required),
      year: new FormControl(null,[Validators.required,Validators.min(1900),Validators.max(new Date().getFullYear())])
    })
  }


  ngOnInit(): void {
    this.fetchmovies();
  }

  fetchmovies(){
    this.movies=this.movieservice.getmovies();
  }

  onSubmit(){
    if(this.movieForm.valid){
      const movie:Movie=this.movieForm.value;
      if(this.movieid){
        const movietoupdate = this.movieservice.getmovies().find(m=>m.id==this.movieid);

        if(movietoupdate){
          movie.id=this.movieid;
          this.movieservice.updatemovies(movie)
        }
        else{
          alert(`Movie With id ${this.movieid} not found`);
        }

      }
      else{
        this.movieservice.addmovies(movie);
      }
      this.fetchmovies()
      this.resetForm()
    }
  }


  // OnEdit(movie: Movie){
  //   console.log("Check Edit Button Click",movie)
  //   this.selectedmovies=movie
  //   this.movieForm.patchValue({
  //     title:movie.title,
  //     genre:movie.genre,
  //     year:movie.year,
  //   });
  // }


  onEdit():void{
    if(this.movieid){
      const movie = this.movieservice.getmovies().find(m=>m.id==this.movieid);
      if(movie){
        this.selectedmovies=movie;
        this.movieForm.setValue({
          id:movie.id,
          title: movie.title,
          genre: movie.genre,
          year: movie.year,
        });
      }
      else{
        alert(`Movie with id ${this.movieid} not found`)
      }
    }
  }

  onDelete(id:number | any):void{
    this.movieservice.deletemovies(id);
    // we reset a form
    this.fetchmovies();
  }

  resetForm(){
    this.movieForm.reset()
    this.selectedmovies=null
    this.movieid=null
  }

}
