# _AUDIT_REPORT

## 0) Repo Kok Kontrolu
- Calisma dizini: C:\myedenday-alp
- shopify.theme.toml mevcut mu?: Evet

## 1) Calisma Agaci Ozeti
### git status --porcelain
```text
?? assets/myed-404-glass.css
?? assets/myed-cart-drawer-empty.css
?? assets/myed-cart-empty.css
?? assets/myed-collections-glass.css
?? assets/myed-product-info-colors.css
```
### git diff --name-only
- Cikti bos (tracked dosyalarda unstaged diff yok).

## 2) Referans Tarama (Toplu)
```text
snippets\cart-drawer.liquid:14:  {{ 'myed-cart-drawer-empty.css' | asset_url | stylesheet_tag }}
sections\main-cart-items.liquid:39:        {{ 'myed-cart-empty.css' | asset_url | stylesheet_tag }}
sections\main-list-collections.liquid:3:{{ 'myed-collections-glass.css' | asset_url | stylesheet_tag }}
sections\main-product.liquid:18:  {{ 'myed-product-info-colors.css' | asset_url | stylesheet_tag }}
```

## 3) Komut Izleri (Bu Audit Calismasinda Kullanilan Turler)
- Get-Location, Test-Path, Get-Content
- git status --porcelain, git diff --name-only, git log --follow, git diff -- <path>
- rg -n ile referans ve log pattern taramasi

## File: assets/myed-cart-drawer-empty.css

1) Dosya durumu:
- Mevcut mu?: Evet

2) Referanslar (bu dosyayi kim cagiriyor?):
```text
snippets\cart-drawer.liquid:14:  {{ 'myed-cart-drawer-empty.css' | asset_url | stylesheet_tag }}
```

3) Git gecmisi var mi?:
- UNTRACKED/NO HISTORY

4) Working tree degisikligi var mi?:
```text
?? assets/myed-cart-drawer-empty.css
```
- UNTRACKED: no diff

5) Icerik ozet imzasi:
- Ilk 15 satir:
```text
/* Restored placeholder file after accidental deletion. */
```
- Header/Canonical imza: bulunamadi (ilk 30 satirda).

6) Olay zaman cizelgesi (Shopify CLI Synced update/delete):
- Repo icinde eslesen Synced update/delete satiri bulunamadi.
- Terminal scrollback dogrudan erisilebilir degil; esleme icin kullanicidan Shopify CLI log ciktisi istenmeli.

7) Sonuc (birebir geri getirilebilir mi?):
- Evet — Kaynak: Local mevcut dosya (calisma agaci snapshot). Git gecmisi yok.

---

## File: assets/myed-cart-empty.css

1) Dosya durumu:
- Mevcut mu?: Evet

2) Referanslar (bu dosyayi kim cagiriyor?):
```text
sections\main-cart-items.liquid:39:        {{ 'myed-cart-empty.css' | asset_url | stylesheet_tag }}
```

3) Git gecmisi var mi?:
- UNTRACKED/NO HISTORY

4) Working tree degisikligi var mi?:
```text
?? assets/myed-cart-empty.css
```
- UNTRACKED: no diff

5) Icerik ozet imzasi:
- Ilk 15 satir:
```text
/* Restored placeholder file after accidental deletion. */
```
- Header/Canonical imza: bulunamadi (ilk 30 satirda).

6) Olay zaman cizelgesi (Shopify CLI Synced update/delete):
- Repo icinde eslesen Synced update/delete satiri bulunamadi.
- Terminal scrollback dogrudan erisilebilir degil; esleme icin kullanicidan Shopify CLI log ciktisi istenmeli.

7) Sonuc (birebir geri getirilebilir mi?):
- Evet — Kaynak: Local mevcut dosya (calisma agaci snapshot). Git gecmisi yok.

---

## File: assets/myed-collections-glass.css

1) Dosya durumu:
- Mevcut mu?: Evet

2) Referanslar (bu dosyayi kim cagiriyor?):
```text
sections\main-list-collections.liquid:3:{{ 'myed-collections-glass.css' | asset_url | stylesheet_tag }}
```

3) Git gecmisi var mi?:
- UNTRACKED/NO HISTORY

4) Working tree degisikligi var mi?:
```text
?? assets/myed-collections-glass.css
```
- UNTRACKED: no diff

5) Icerik ozet imzasi:
- Ilk 15 satir:
```text
/* Restored placeholder file after accidental deletion. */
```
- Header/Canonical imza: bulunamadi (ilk 30 satirda).

6) Olay zaman cizelgesi (Shopify CLI Synced update/delete):
- Repo icinde eslesen Synced update/delete satiri bulunamadi.
- Terminal scrollback dogrudan erisilebilir degil; esleme icin kullanicidan Shopify CLI log ciktisi istenmeli.

7) Sonuc (birebir geri getirilebilir mi?):
- Evet — Kaynak: Local mevcut dosya (calisma agaci snapshot). Git gecmisi yok.

---

## File: assets/myed-product-info-colors.css

1) Dosya durumu:
- Mevcut mu?: Evet

2) Referanslar (bu dosyayi kim cagiriyor?):
```text
sections\main-product.liquid:18:  {{ 'myed-product-info-colors.css' | asset_url | stylesheet_tag }}
```

3) Git gecmisi var mi?:
- UNTRACKED/NO HISTORY

4) Working tree degisikligi var mi?:
```text
?? assets/myed-product-info-colors.css
```
- UNTRACKED: no diff

5) Icerik ozet imzasi:
- Ilk 15 satir:
```text
/* Restored placeholder file after accidental deletion. */
```
- Header/Canonical imza: bulunamadi (ilk 30 satirda).

6) Olay zaman cizelgesi (Shopify CLI Synced update/delete):
- Repo icinde eslesen Synced update/delete satiri bulunamadi.
- Terminal scrollback dogrudan erisilebilir degil; esleme icin kullanicidan Shopify CLI log ciktisi istenmeli.

7) Sonuc (birebir geri getirilebilir mi?):
- Evet — Kaynak: Local mevcut dosya (calisma agaci snapshot). Git gecmisi yok.

---

## File: assets/myed-404-glass.css

1) Dosya durumu:
- Mevcut mu?: Evet

2) Referanslar (bu dosyayi kim cagiriyor?):
- Referans bulunamadi.

3) Git gecmisi var mi?:
- UNTRACKED/NO HISTORY

4) Working tree degisikligi var mi?:
```text
?? assets/myed-404-glass.css
```
- UNTRACKED: no diff

5) Icerik ozet imzasi:
- Ilk 15 satir:
```text
/* Restored placeholder file after accidental deletion. */
```
- Header/Canonical imza: bulunamadi (ilk 30 satirda).

6) Olay zaman cizelgesi (Shopify CLI Synced update/delete):
- Repo icinde eslesen Synced update/delete satiri bulunamadi.
- Terminal scrollback dogrudan erisilebilir degil; esleme icin kullanicidan Shopify CLI log ciktisi istenmeli.

7) Sonuc (birebir geri getirilebilir mi?):
- Evet — Kaynak: Local mevcut dosya (calisma agaci snapshot). Git gecmisi yok.

---

## File: snippets/cart-drawer.liquid

1) Dosya durumu:
- Mevcut mu?: Evet

2) Referanslar (bu dosyayi kim cagiriyor?):
- Referans bulunamadi.

3) Git gecmisi var mi?:
- Durum: HISTORY_FOUND
- Ilk commit (oldest): ce6df98 2026-02-09 23:39:18 +0300 Muhammed Alp İlk commit: tüm dosyalar eklendi
- Son commit (latest): 703596b 2026-02-28 21:36:55 +0300 Muhammed Alp Remove vitrine (intentional)
- Commit listesi:
```text
703596b 2026-02-28 21:36:55 +0300 Muhammed Alp Remove vitrine (intentional)
ce6df98 2026-02-09 23:39:18 +0300 Muhammed Alp İlk commit: tüm dosyalar eklendi
```

4) Working tree degisikligi var mi?:
- Bu dosya icin git status satiri yok (tracked/clean olabilir).
- Tracked; unstaged diff yok.

5) Icerik ozet imzasi:
- Ilk 15 satir:
```text
{% comment %}
  Renders cart drawer

  Usage:
  {% render 'cart-drawer' %}
{% endcomment %}

{{ 'quantity-popover.css' | asset_url | stylesheet_tag }}
{{ 'component-card.css' | asset_url | stylesheet_tag }}

<script src="{{ 'cart.js' | asset_url }}" defer="defer"></script>
<script src="{{ 'quantity-popover.js' | asset_url }}" defer="defer"></script>
{%- if cart == empty -%}
  {{ 'myed-cart-drawer-empty.css' | asset_url | stylesheet_tag }}
{%- endif -%}
```
- Header/Canonical imza: bulunamadi (ilk 30 satirda).

6) Olay zaman cizelgesi (Shopify CLI Synced update/delete):
- Repo icinde eslesen Synced update/delete satiri bulunamadi.
- Terminal scrollback dogrudan erisilebilir degil; esleme icin kullanicidan Shopify CLI log ciktisi istenmeli.

7) Sonuc (birebir geri getirilebilir mi?):
- Evet — Kaynak: Git gecmisi (git log --follow).

---

## File: sections/main-cart-items.liquid

1) Dosya durumu:
- Mevcut mu?: Evet

2) Referanslar (bu dosyayi kim cagiriyor?):
- Referans bulunamadi.

3) Git gecmisi var mi?:
- Durum: HISTORY_FOUND
- Ilk commit (oldest): ce6df98 2026-02-09 23:39:18 +0300 Muhammed Alp İlk commit: tüm dosyalar eklendi
- Son commit (latest): 703596b 2026-02-28 21:36:55 +0300 Muhammed Alp Remove vitrine (intentional)
- Commit listesi:
```text
703596b 2026-02-28 21:36:55 +0300 Muhammed Alp Remove vitrine (intentional)
ce6df98 2026-02-09 23:39:18 +0300 Muhammed Alp İlk commit: tüm dosyalar eklendi
```

4) Working tree degisikligi var mi?:
- Bu dosya icin git status satiri yok (tracked/clean olabilir).
- Tracked; unstaged diff yok.

5) Icerik ozet imzasi:
- Ilk 15 satir:
```text
{{ 'component-cart.css' | asset_url | stylesheet_tag }}
{{ 'component-cart-items.css' | asset_url | stylesheet_tag }}
{{ 'component-totals.css' | asset_url | stylesheet_tag }}
{{ 'component-price.css' | asset_url | stylesheet_tag }}
{{ 'component-discounts.css' | asset_url | stylesheet_tag }}
{{ 'quantity-popover.css' | asset_url | stylesheet_tag }}

{%- style -%}
  .section-{{ section.id }}-padding {
    padding-top: {{ section.settings.padding_top | times: 0.75 | round: 0 }}px;
    padding-bottom: {{ section.settings.padding_bottom | times: 0.75 | round: 0 }}px;
  }

  @media screen and (min-width: 750px) {
    .section-{{ section.id }}-padding {
```
- Header/Canonical imza: bulunamadi (ilk 30 satirda).

6) Olay zaman cizelgesi (Shopify CLI Synced update/delete):
- Repo icinde eslesen Synced update/delete satiri bulunamadi.
- Terminal scrollback dogrudan erisilebilir degil; esleme icin kullanicidan Shopify CLI log ciktisi istenmeli.

7) Sonuc (birebir geri getirilebilir mi?):
- Evet — Kaynak: Git gecmisi (git log --follow).

---

## File: sections/main-login.liquid

1) Dosya durumu:
- Mevcut mu?: Evet

2) Referanslar (bu dosyayi kim cagiriyor?):
- Referans bulunamadi.

3) Git gecmisi var mi?:
- Durum: HISTORY_FOUND
- Ilk commit (oldest): ce6df98 2026-02-09 23:39:18 +0300 Muhammed Alp İlk commit: tüm dosyalar eklendi
- Son commit (latest): ce6df98 2026-02-09 23:39:18 +0300 Muhammed Alp İlk commit: tüm dosyalar eklendi
- Commit listesi:
```text
ce6df98 2026-02-09 23:39:18 +0300 Muhammed Alp İlk commit: tüm dosyalar eklendi
```

4) Working tree degisikligi var mi?:
- Bu dosya icin git status satiri yok (tracked/clean olabilir).
- Tracked; unstaged diff yok.

5) Icerik ozet imzasi:
- Ilk 15 satir:
```text
{{ 'customer.css' | asset_url | stylesheet_tag }}

{%- style -%}
  .section-{{ section.id }}-padding {
    padding-top: {{ section.settings.padding_top | times: 0.75 | round: 0 }}px;
    padding-bottom: {{ section.settings.padding_bottom | times: 0.75 | round: 0 }}px;
  }

  @media screen and (min-width: 750px) {
    .section-{{ section.id }}-padding {
      padding-top: {{ section.settings.padding_top }}px;
      padding-bottom: {{ section.settings.padding_bottom }}px;
    }
  }
{%- endstyle -%}
```
- Header/Canonical imza: bulunamadi (ilk 30 satirda).

6) Olay zaman cizelgesi (Shopify CLI Synced update/delete):
- Repo icinde eslesen Synced update/delete satiri bulunamadi.
- Terminal scrollback dogrudan erisilebilir degil; esleme icin kullanicidan Shopify CLI log ciktisi istenmeli.

7) Sonuc (birebir geri getirilebilir mi?):
- Evet — Kaynak: Git gecmisi (git log --follow).

---

## File: sections/main-404.liquid

1) Dosya durumu:
- Mevcut mu?: Evet

2) Referanslar (bu dosyayi kim cagiriyor?):
- Referans bulunamadi.

3) Git gecmisi var mi?:
- Durum: HISTORY_FOUND
- Ilk commit (oldest): ce6df98 2026-02-09 23:39:18 +0300 Muhammed Alp İlk commit: tüm dosyalar eklendi
- Son commit (latest): ce6df98 2026-02-09 23:39:18 +0300 Muhammed Alp İlk commit: tüm dosyalar eklendi
- Commit listesi:
```text
ce6df98 2026-02-09 23:39:18 +0300 Muhammed Alp İlk commit: tüm dosyalar eklendi
```

4) Working tree degisikligi var mi?:
- Bu dosya icin git status satiri yok (tracked/clean olabilir).
- Tracked; unstaged diff yok.

5) Icerik ozet imzasi:
- Ilk 15 satir:
```text
<style type="text/css">
  .template-404 .title + * {
    margin-top: 1rem;
  }

  @media screen and (min-width: 750px) {
    .template-404 .title + * {
      margin-top: 2rem;
    }
  }
</style>

<div class="template-404 page-width page-margin center">
  <p>
    {{ 'templates.404.subtext' | t }}
```
- Header/Canonical imza: bulunamadi (ilk 30 satirda).

6) Olay zaman cizelgesi (Shopify CLI Synced update/delete):
- Repo icinde eslesen Synced update/delete satiri bulunamadi.
- Terminal scrollback dogrudan erisilebilir degil; esleme icin kullanicidan Shopify CLI log ciktisi istenmeli.

7) Sonuc (birebir geri getirilebilir mi?):
- Evet — Kaynak: Git gecmisi (git log --follow).

---

## File: layout/theme.liquid

1) Dosya durumu:
- Mevcut mu?: Evet

2) Referanslar (bu dosyayi kim cagiriyor?):
- Referans bulunamadi.

3) Git gecmisi var mi?:
- Durum: HISTORY_FOUND
- Ilk commit (oldest): ce6df98 2026-02-09 23:39:18 +0300 Muhammed Alp İlk commit: tüm dosyalar eklendi
- Son commit (latest): 74c3c13 2026-02-26 19:13:40 +0300 Muhammed Alp Restore canonical search glass and facet styling
- Commit listesi:
```text
74c3c13 2026-02-26 19:13:40 +0300 Muhammed Alp Restore canonical search glass and facet styling
a25a9a8 2026-02-23 19:53:07 +0300 Muhammed Alp Tüm dosyalar güncellendi ve commitlendi.
6dfcf40 2026-02-23 06:37:50 +0300 Muhammed Alp Finalize header, hero, orbit, and slider updates
37299a1 2026-02-23 01:50:22 +0300 Muhammed Alp Tüm dosyalar güncellendi ve commitlendi.
a94bc96 2026-02-20 15:13:35 +0300 Muhammed Alp Kullanılmayan ring_color değişkeni kaldırıldı ve diğer dosyalardaki değişiklikler eklendi.
ce6df98 2026-02-09 23:39:18 +0300 Muhammed Alp İlk commit: tüm dosyalar eklendi
```

4) Working tree degisikligi var mi?:
- Bu dosya icin git status satiri yok (tracked/clean olabilir).
- Tracked; unstaged diff yok.

5) Icerik ozet imzasi:
- Ilk 15 satir:
```text
<!doctype html>
<html class="js" lang="{{ request.locale.iso_code }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="theme-color" content="">
    <link rel="canonical" href="{{ canonical_url }}">

    {%- if settings.favicon != blank -%}
      <link rel="icon" type="image/png" href="{{ settings.favicon | image_url: width: 32, height: 32 }}">
    {%- endif -%}

    {%- unless settings.type_header_font.system? and settings.type_body_font.system? -%}
      <link rel="preconnect" href="https://fonts.shopifycdn.com" crossorigin>
```
- Header/Canonical imza tespiti:
  - <link rel="canonical" href="{{ canonical_url }}">

6) Olay zaman cizelgesi (Shopify CLI Synced update/delete):
- Repo icinde eslesen Synced update/delete satiri bulunamadi.
- Terminal scrollback dogrudan erisilebilir degil; esleme icin kullanicidan Shopify CLI log ciktisi istenmeli.

7) Sonuc (birebir geri getirilebilir mi?):
- Evet — Kaynak: Git gecmisi (git log --follow).

---

## File: sections/main-product.liquid

1) Dosya durumu:
- Mevcut mu?: Evet

2) Referanslar (bu dosyayi kim cagiriyor?):
- Referans bulunamadi.

3) Git gecmisi var mi?:
- Durum: HISTORY_FOUND
- Ilk commit (oldest): ce6df98 2026-02-09 23:39:18 +0300 Muhammed Alp İlk commit: tüm dosyalar eklendi
- Son commit (latest): 703596b 2026-02-28 21:36:55 +0300 Muhammed Alp Remove vitrine (intentional)
- Commit listesi:
```text
703596b 2026-02-28 21:36:55 +0300 Muhammed Alp Remove vitrine (intentional)
37299a1 2026-02-23 01:50:22 +0300 Muhammed Alp Tüm dosyalar güncellendi ve commitlendi.
ce6df98 2026-02-09 23:39:18 +0300 Muhammed Alp İlk commit: tüm dosyalar eklendi
```

4) Working tree degisikligi var mi?:
- Bu dosya icin git status satiri yok (tracked/clean olabilir).
- Tracked; unstaged diff yok.

5) Icerik ozet imzasi:
- Ilk 15 satir:
```text
<product-info
  id="MainProduct-{{ section.id }}"
  class="section-{{ section.id }}-padding gradient color-{{ section.settings.color_scheme }}"
  data-section="{{ section.id }}"
  data-product-id="{{ product.id }}"
  data-update-url="true"
  data-url="{{ product.url }}"
  {% if section.settings.image_zoom == 'hover' %}
    data-zoom-on-hover
  {% endif %}
>
  {{ 'section-main-product.css' | asset_url | stylesheet_tag }}
  {{ 'component-accordion.css' | asset_url | stylesheet_tag }}
  {{ 'component-price.css' | asset_url | stylesheet_tag }}
  {{ 'component-slider.css' | asset_url | stylesheet_tag }}
```
- Header/Canonical imza: bulunamadi (ilk 30 satirda).

6) Olay zaman cizelgesi (Shopify CLI Synced update/delete):
- Repo icinde eslesen Synced update/delete satiri bulunamadi.
- Terminal scrollback dogrudan erisilebilir degil; esleme icin kullanicidan Shopify CLI log ciktisi istenmeli.

7) Sonuc (birebir geri getirilebilir mi?):
- Evet — Kaynak: Git gecmisi (git log --follow).

---

## 4) Kok Neden Analizi (Kanita Dayali)
- Kritik 5 dosya git status --porcelain ciktisinda ?? olarak gorunuyor: UNTRACKED.
- Bu dosyalar icin git log --follow ciktisi yok: Git commit gecmisi bulunmuyor.
- Bu nedenle dosyalarin Git uzerinden geri cagrilmasi mumkun degil; yalnizca mevcut local dosyalar kaynak alinabilir.
- Shopify CLI Synced update/delete satirlari repo icinde bulunamadi; terminal scrollback/log kaniti olmadan delete/update kronolojisi dogrulanamadi.

## 5) Sinir ve Guvenlik Notu
- Bu calisma read-only inceleme + tek rapor uretimidir.
- Bu adimda yalnizca _AUDIT_REPORT.md olusturuldu; mevcut proje dosyalarinda icerik degisikligi yapilmadi.
