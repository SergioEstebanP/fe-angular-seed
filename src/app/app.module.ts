import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// COMPONENTS
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectiveComponent } from './directive/directive.component';
import { ClientsComponent } from './clients/clients.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { FormComponent } from './clients/form.component'
import { ClientService } from './clients/client.service';


const routes: Routes = [
    { path: '', redirectTo: 'clients', pathMatch: 'full' },
    { path: 'clients', component: ClientsComponent },
    { path: 'clients/page/:page', component: ClientsComponent },
    { path: 'clients/form', component: FormComponent },
    { path: 'clients/form/:id', component: FormComponent },
    { path: 'directives', component: DirectiveComponent }
]

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        DirectiveComponent,
        ClientsComponent,
        FormComponent,
        PaginatorComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(routes)
    ],
    providers: [ClientService],
    bootstrap: [AppComponent]
})
export class AppModule { }
