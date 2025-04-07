import {Component, Injector, OnInit} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {Toolbar} from 'primeng/toolbar';
import {Router} from '@angular/router';
import {StyleService} from '../../services/style.service';
import {LoginService} from '../../services/login.service';
import {Card} from 'primeng/card';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {MessageService, PrimeTemplate} from 'primeng/api';
import {Rating} from 'primeng/rating';
import {TableModule} from 'primeng/table';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {Dialog} from 'primeng/dialog';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {Select} from 'primeng/select';
import {MessagesModule} from 'primeng/messages';
import {Message} from 'primeng/message';
import {AutoComplete} from 'primeng/autocomplete';

@Component({
  selector: 'app-profile',
  imports: [
    ButtonDirective,
    Toolbar,
    Card,
    NgIf,
    NgForOf,
    DecimalPipe,
    PrimeTemplate,
    Rating,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    Dialog,
    InputText,
    Password,
    Select,
    Message,
    MessagesModule,
    AutoComplete
  ],
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user: any;
  isAdmin: boolean = false;
  showAddUserDialog = false;
  showRemoveUserDialog = false;
  addUserForm: FormGroup;
  roleOptions = [
    { label: 'User', value: 'user' },
    { label: 'Admin', value: 'admin' }
  ];
  filteredUsers: any[] = [];
  selectedUserToRemove: any;
  constructor(
    private router: Router,
    private styleService: StyleService,
    private loginService: LoginService,
    private fb: FormBuilder,
    private injector: Injector,
    private messageService: MessageService
  ) {
    injector.get(MessageService)
    this.addUserForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['user', Validators.required]
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.styleService.labelWidth = "125px";
      this.styleService.labelHeight = "30px";
    })

    this.loginService.getUserFromBackend()?.subscribe({
      next: (res) => {
        this.user = res;
        this.isAdmin = res.role === 'admin';
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      }
    });
  }

  getAverageRating(): number {
    const ratings = this.user?.ratingsAndReviews?.map((r: any) => r.rating) || [];
    return ratings.length ? ratings.reduce((a: any, b: any) => a + b, 0) / ratings.length : 0;
  }

  navigateToHome() {
    this.router.navigate(["/home"])
  }

  addUser() {
    if (this.addUserForm.invalid) return;

    this.loginService.addUser(this.addUserForm.value).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User added successfully', life: 1000 });
        this.addUserForm.reset({ role: 'user' });
        setTimeout(() => {
          this.showAddUserDialog = false;
          this.addUserForm.reset()
        }, 1000)
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add user' });
      }
    });
  }
  searchUsers(event: any) {
    const query = event.query;

    this.loginService.searchUsers(query).subscribe((users) => {
      this.filteredUsers = users;
    });
  }

  removeUser() {
    if (!this.selectedUserToRemove) return;

    this.loginService.removeUser(this.selectedUserToRemove._id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User removed', life: 1000});
        this.selectedUserToRemove = null;

        setTimeout(() => {
            this.showRemoveUserDialog = false;
          },
          1000)
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not remove user', life: 1000 });
      }
    });
  }

  navigateToItem(itemId: any) {
    this.router.navigate([`/home/items/${itemId}`]);
  }
}
