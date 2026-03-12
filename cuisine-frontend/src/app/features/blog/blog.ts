import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  category: string;
  readTime: number;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class BlogComponent {
  blogs: BlogPost[] = [
    {
      id: 1,
      title: 'The Art of French Cooking: Classic Techniques Everyone Should Know',
      excerpt: 'Discover the fundamental techniques that make French cuisine legendary. From mastering the mother sauces to perfecting your knife skills...',
      author: 'Marie Laurent',
      date: '2026-03-05',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
      category: 'Techniques',
      readTime: 8
    },
    {
      id: 2,
      title: '10 Essential Spices That Will Transform Your Dishes',
      excerpt: 'Spices are the heart of flavorful cooking. Learn about the 10 essential spices every home cook should have in their pantry...',
      author: 'John Smith',
      date: '2026-03-04',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800',
      category: 'Ingredients',
      readTime: 6
    },
    {
      id: 3,
      title: 'Healthy Meal Prep: A Complete Beginner\'s Guide',
      excerpt: 'Save time and eat healthier with meal prepping. This guide covers everything from planning to storage tips...',
      author: 'Sarah Johnson',
      date: '2026-03-03',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800',
      category: 'Healthy',
      readTime: 10
    },
    {
      id: 4,
      title: 'The Secret to Perfect Homemade Pasta Every Time',
      excerpt: 'Nothing beats fresh homemade pasta. Learn the secrets to creating silky, tender pasta that rivals any Italian restaurant...',
      author: 'Marco Rossi',
      date: '2026-03-02',
      image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800',
      category: 'Italian',
      readTime: 7
    },
    {
      id: 5,
      title: 'Exploring Asian Flavors: Umami and Beyond',
      excerpt: 'Dive into the rich world of Asian cuisine. From Japanese dashi to Thai curries, discover the flavors that make these dishes special...',
      author: 'Yuki Tanaka',
      date: '2026-03-01',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
      category: 'Asian',
      readTime: 9
    },
    {
      id: 6,
      title: 'Baking Basics: From Sourdough to Croissants',
      excerpt: 'Master the art of baking with these fundamental techniques. Your journey to becoming a home baker starts here...',
      author: 'Emma Davis',
      date: '2026-02-28',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
      category: 'Baking',
      readTime: 12
    }
  ];

  constructor(private router: Router) {}

  navigateToBlogDetail(id: number): void {
    this.router.navigate(['/blog', id]);
  }
}
