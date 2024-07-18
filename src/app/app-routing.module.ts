import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { VillageComponent } from './routes/village/village.component';
import { DistrictComponent } from './routes/district/district.component';
import { ArtCraftComponent } from './routes/art-craft/art-craft.component';
import { ActionsComponent } from './routes/actions/actions.component';
import { GalleryComponent } from './routes/gallery/gallery.component';
import { MediaComponent } from './routes/media/media.component';
import { DownloadsComponent } from './routes/downloads/downloads.component';
import { ToursComponent } from './routes/tours/tours.component';
import { TourComponent } from './routes/tour/tour.component';
import { WhatsNewComponent } from './routes/whats-new/whats-new.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ExploreComponent } from './components/explore/explore.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { EnquireComponent } from './components/enquire/enquire.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ArtistProductListComponent } from './components/artist-product-list/artist-product-list.component';
import {SafartunesShareComponent} from './components/safartunes-share/safartunes-share.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'village/:villageId', component: VillageComponent },
  { path: 'district/:districtId', component: DistrictComponent },
  { path: 'art&craft/:craftId', component: ArtCraftComponent },
  { path: 'actions', component: ActionsComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'media', component: MediaComponent },
  { path: 'downloads', component: DownloadsComponent },
  { path: 'tours', component: ToursComponent },
  { path: 'tour', redirectTo: 'tours' },
  { path: 'tour/:tourId', component: TourComponent },
  {path: 'explore/:catId', component: ProductListComponent},
  {path: 'enquire', component: EnquireComponent},
  {path: 'explore', component: ExploreComponent},
  {path: 'explore/product/:prodId', component: ProductDetailsComponent},
  { path: 'whats-new', component: WhatsNewComponent },
  {path: 'orders', component: OrdersComponent},
  {path: 'add-product', component: AddProductComponent},
  {path: 'products', component: ArtistProductListComponent},
  {path: 'safarTunes/share/:uuid', component: SafartunesShareComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
