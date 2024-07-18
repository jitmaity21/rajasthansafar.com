import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxPaginationModule } from 'ngx-pagination';
import { ImageViewerModule } from "ngx-image-viewer";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarTopComponent } from './components/common/navbar-top/navbar-top.component';
import { HomeComponent } from './routes/home/home.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { BannerComponent } from './components/common/banner/banner.component';
import { HomepageUpperSectionComponent } from './components/homepage/homepage-upper-section/homepage-upper-section.component';
import { HomepageArtCraftCardsComponent } from './components/homepage/homepage-art-craft-cards/homepage-art-craft-cards.component';
import { ColorOverlayCarouselComponent } from './components/common/color-overlay-carousel/color-overlay-carousel.component';
import { EventsGalleryComponent } from './components/common/events-gallery/events-gallery.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { SocialEmbedsComponent } from './components/homepage/social-embeds/social-embeds.component';
import { VillageComponent } from './routes/village/village.component';
import { DistrictComponent } from './routes/district/district.component';
import { ArtCraftComponent } from './routes/art-craft/art-craft.component';
import { StyledIntroComponent } from './components/common/styled-intro/styled-intro.component';
import { FourIntroGalleryComponent } from './components/art-craft/four-intro-gallery/four-intro-gallery.component';
import { ArtCraftFeaturesComponent } from './components/art-craft/art-craft-features/art-craft-features.component';
import { ArtCraftArtistProfileComponent } from './components/art-craft/art-craft-artist-profile/art-craft-artist-profile.component';
import { ArtCraftProductGalleryComponent } from './components/art-craft/art-craft-product-gallery/art-craft-product-gallery.component';
import { ArtAttractionSlickCarouselComponent } from './components/common/art-attraction-slick-carousel/art-attraction-slick-carousel.component';
import { VillageSnippetCarouselComponent } from './components/village/village-snippet-carousel/village-snippet-carousel.component';
import { VillageQuickFactsComponent } from './components/village/village-quick-facts/village-quick-facts.component';
import { DistrictQuickFactsComponent } from './components/district/district-quick-facts/district-quick-facts.component';
import { DistrictArtCraftGalleryComponent } from './components/district/district-art-craft-gallery/district-art-craft-gallery.component';
import { HomepageDistrictsMapComponent } from './components/homepage/homepage-districts-map/homepage-districts-map.component';
import { LanguageSwitcherComponent } from './components/common/language-switcher/language-switcher.component';
import { CardsSlickCarouselComponent } from './components/common/cards-slick-carousel/cards-slick-carousel.component';
import { CardOverlayCarouselComponent } from './components/common/card-overlay-carousel/card-overlay-carousel.component';
import { ActionsComponent } from './routes/actions/actions.component';
import { ActionUpperSectionComponent } from './components/actions/action-upper-section/action-upper-section.component';
import { ActionsProjectsComponent } from './components/actions/actions-projects/actions-projects.component';
import { ActionsVideosComponent } from './components/actions/actions-videos/actions-videos.component';
import { GalleryComponent } from './routes/gallery/gallery.component';
import { MediaComponent } from './routes/media/media.component';
import { DownloadsComponent } from './routes/downloads/downloads.component';
import { GalleryPicturesComponent } from './components/gallery/gallery-pictures/gallery-pictures.component';
import { ToursComponent } from './routes/tours/tours.component';
import { TourComponent } from './routes/tour/tour.component';
import { CollaborationsComponent } from './components/tours/collaborations/collaborations.component';
import { WhatsNewComponent } from './routes/whats-new/whats-new.component';
import { AuthModalComponent } from './components/common/auth-modal/auth-modal.component';
import { CartModalComponent } from './components/common/cart-modal/cart-modal.component';
import { ExploreComponent } from './components/explore/explore.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCardComponent } from './components/common/product-card/product-card.component';
import { ImageHolderSmallComponent } from './components/common/image-holder-small/image-holder-small.component';
import { EnquireComponent } from './components/enquire/enquire.component';
import { ToastComponent } from './components/common/toast/toast.component';
import { EnquireOrderComponent } from './components/enquire/enquire-order/enquire-order.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrdersOrderComponent } from './components/orders/orders-order/orders-order.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ArtistProductListComponent } from './components/artist-product-list/artist-product-list.component';
import { GalleryVideosComponent } from './components/gallery/gallery-videos/gallery-videos.component';
import { ArtistCraftVibrantMomentsComponent } from './components/art-craft/artist-craft-vibrant-moments/artist-craft-vibrant-moments.component';
import { SafartunesShareComponent } from './components/safartunes-share/safartunes-share.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarTopComponent,
    HomeComponent,
    NavbarComponent,
    BannerComponent,
    HomepageUpperSectionComponent,
    HomepageArtCraftCardsComponent,
    ColorOverlayCarouselComponent,
    EventsGalleryComponent,
    FooterComponent,
    SocialEmbedsComponent,
    VillageComponent,
    DistrictComponent,
    ArtCraftComponent,
    StyledIntroComponent,
    FourIntroGalleryComponent,
    ArtCraftFeaturesComponent,
    ArtCraftArtistProfileComponent,
    ArtCraftProductGalleryComponent,
    ArtAttractionSlickCarouselComponent,
    VillageSnippetCarouselComponent,
    VillageQuickFactsComponent,
    DistrictQuickFactsComponent,
    DistrictArtCraftGalleryComponent,
    HomepageDistrictsMapComponent,
    LanguageSwitcherComponent,
    CardsSlickCarouselComponent,
    CardOverlayCarouselComponent,
    ActionsComponent,
    ActionUpperSectionComponent,
    ActionsProjectsComponent,
    ActionsVideosComponent,
    GalleryComponent,
    MediaComponent,
    DownloadsComponent,
    GalleryPicturesComponent,
    ToursComponent,
    TourComponent,
    CollaborationsComponent,
    WhatsNewComponent,
    AuthModalComponent,
    CartModalComponent,
    ExploreComponent,
    ProductDetailsComponent,
    ProductListComponent,
    ProductCardComponent,
    ImageHolderSmallComponent,
    EnquireComponent,
    ToastComponent,
    EnquireOrderComponent,
    OrdersComponent,
    OrdersOrderComponent,
    AddProductComponent,
    ArtistProductListComponent,
    GalleryVideosComponent,
    ArtistCraftVibrantMomentsComponent,
    SafartunesShareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    SlickCarouselModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ImageViewerModule.forRoot()
  ],
  providers: [{ provide: Window, useValue: window }],
  bootstrap: [AppComponent]
})
export class AppModule { }
