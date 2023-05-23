import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Post } from 'src/app/model/post';

@Injectable({
  providedIn: 'root'
})
export class RedditService {

  constructor(private http: HttpClient) { }
  getRedditPosts(argument:string): Observable <Post[]>{
    return this.http
    .get<any>('https://www.reddit.com/r/'+argument+'/hot.json?limit=100').pipe(
    // tap((obj) => console.log('sono dentro il primo tap', obj)),
    map((obj) => obj.data),
    // tap(data => console.log('sono dentro il secondo tap', data)),
    map((data) => data.children),
    // tap((children) => console.log('Sono dentro al terzo tap', children)),
    map((children) => children.map((child: { data: any; }) => child.data)),
    // tap((childrenData) => console.log('Sono dentro al quarto tap', childrenData))

    // map((obj) =>{
    //   const data = obj.data;
    //   const children = data.children;
    //   const childrenData = children.map((child: { data: any; }) => child.data);
    //   return childrenData})

    // map(obj => obj.parseData())

   )

}
// parseData(obj: any){
//   const data = obj.data;
//     const children = data.children;
//     const childrenData = children.map((child: { data: any; }) => child.data);
//     return childrenData
// }

}
