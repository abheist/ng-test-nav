import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FormData } from '../../services/form-data';

export interface SidebarItem {
  id: number;
  label: string;
  icon: string;
  route: string;
  completed: boolean;
  children?: SidebarItem[];
  // isExpanded and isParent are now derived automatically
}

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar implements OnInit {
  currentRoute: string = '';
  expandedItems: Set<number> = new Set(); // Track expanded item IDs
  
  // This would come from backend in real app
  items: SidebarItem[] = [
    { id: 0, label: 'Personal Info', icon: 'person', route: '/personal-info', completed: false },
    { 
      id: 1, 
      label: 'Contact Info', 
      icon: 'contact_phone', 
      route: '/contact-info', 
      completed: false,
      children: [
        { id: 12, label: 'Address', icon: 'home', route: '/contact-info/address', completed: false },
        { id: 13, label: 'Phone', icon: 'phone', route: '/contact-info/phone', completed: false }
      ]
    },
    { id: 2, label: 'Preferences', icon: 'settings', route: '/preferences', completed: false }
  ];

  constructor(
    private router: Router,
    private formDataService: FormData
  ) {}

  ngOnInit() {
    // In real app, you would load items from backend here
    this.loadSidebarItems();
    
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
        this.updateCompletedSteps();
        this.updateExpandedStates();
      });
    
    this.currentRoute = this.router.url;
    this.updateCompletedSteps();
    this.updateExpandedStates();
  }

  // Simulate loading sidebar items from backend
  private loadSidebarItems() {
    // In real app: this.sidebarService.getSidebarItems().subscribe(items => this.items = items)
    // For now, items are already set in the class
    console.log('Sidebar items loaded:', this.items);
  }

  onStepClick(route: string, item?: SidebarItem) {
    if (this.isParent(item)) {
      // For parent items, expand and navigate
      this.expandedItems.add(item!.id);
      this.router.navigate([route]);
    } else {
      // Navigate for regular items
      this.router.navigate([route]);
    }
  }

  onChevronClick(event: Event, item: SidebarItem) {
    // Stop the event from bubbling up to the parent click
    event.stopPropagation();
    
    // Toggle expansion without navigation
    if (this.isParent(item)) {
      if (this.isExpanded(item)) {
        this.expandedItems.delete(item.id);
      } else {
        this.expandedItems.add(item.id);
      }
    }
  }

  onChildClick(route: string) {
    this.router.navigate([route]);
  }

  // Helper methods
  isParent(item?: SidebarItem): boolean {
    return !!(item?.children && item.children.length > 0);
  }

  isExpanded(item: SidebarItem): boolean {
    return this.expandedItems.has(item.id);
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

  isChildActive(route: string): boolean {
    return this.currentRoute.startsWith(route);
  }

  private updateExpandedStates() {
    this.items.forEach(item => {
      if (this.isParent(item)) {
        // Expand if on parent route OR any child route is active
        const isOnParentRoute = this.currentRoute === item.route;
        const hasActiveChild = item.children!.some(child => 
          this.currentRoute.startsWith(child.route) || this.currentRoute === child.route
        );
        if (isOnParentRoute || hasActiveChild) {
          this.expandedItems.add(item.id);
        }
      }
    });
  }

  private updateCompletedSteps() {
    const formData = this.formDataService.getFormData();
    
    // Mark steps as completed based on form data
    this.items[0].completed = !!(formData.personalInfo.firstName && formData.personalInfo.lastName && formData.personalInfo.email);
    
    // Update contact info parent and children completion
    const contactItem = this.items[1];
    if (contactItem.children) {
      contactItem.children[0].completed = !!(formData.contactInfo.address && formData.contactInfo.city); // Address
      contactItem.children[1].completed = !!(formData.contactInfo.phone); // Phone
      
      // Parent is completed if email is filled AND all children are completed
      const emailCompleted = !!(formData.contactInfo.email);
      const childrenCompleted = contactItem.children.every(child => child.completed);
      contactItem.completed = emailCompleted && childrenCompleted;
    }
    
    this.items[2].completed = true; // Preferences is always considered complete since fields are optional
  }
}
