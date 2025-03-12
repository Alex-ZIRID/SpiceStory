import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent {
  @Input() recipeId!: number;

  comments: { user: string; text: string }[] = [
    { user: 'Alice', text: 'Great recipe!' },
    { user: 'Bob', text: 'I tried this and loved it!' }
  ];
  newComment: string = '';

  addComment() {
    if (this.newComment.trim()) {
      this.comments.push({ user: 'You', text: this.newComment });
      this.newComment = '';
    }
  }
}