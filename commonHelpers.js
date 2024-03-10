import{a as h,i as g,S as f}from"./assets/vendor-luKj5phc.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function i(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(e){if(e.ep)return;e.ep=!0;const a=i(e);fetch(e.href,a)}})();function m(s,t){const i=s.map(r=>`<li class="gallery-item">
          <a href="${r.largeImageURL}">
            <img src="${r.webformatURL}" alt="${r.tags}" width="360" height="152"/>
            <div class="text-content-box">
                <p class="image-text"><span class="image-title">Likes</span> ${r.likes}</p>
                <p class="image-text"><span class="image-title">Views</span> ${r.views}</p>
                <p class="image-text"><span class="image-title">Comments</span> ${r.comments}</p>
                <p class="image-text"><span class="image-title">Downloads</span> ${r.downloads}</p>
            </div>
        </a>
      </li>`).join("");t.insertAdjacentHTML("beforeend",i)}function u(s){s.innerHTML=""}class y{constructor(){this.searchQuery="",this.page=1,this.perPage=15,this.baseUrl="https://pixabay.com/api/",this.loadMoreButton=document.querySelector(".js-load-more-btn")}async fetchImages(){const t=`${this.baseUrl}?key=42616276-59c99055eec179e7b1bf68313&q=${this.searchQuery}&lang=en&per_page=${this.perPage}&page=${this.page}`;this.incrementPage();try{const r=(await h.get(t)).data,e=r.totalHits;if(r.total===0){p(),this.loadMoreButton.style.display="none";return}if(e<this.page*this.perPage){b(),this.loadMoreButton.style.display="none";return}return r.hits}catch{throw new Error("Failed to fetch images")}}incrementPage(){this.page+=1}resetPage(){this.page=1}get query(){return this.searchQuery}set query(t){this.searchQuery=t}}function p(s){g.show({message:"Sorry, there are no images matching <br> your search query. Please, try again!",position:"topRight",timeout:5e3,backgroundColor:"#ef4040",messageColor:"#ffffff",messageSize:"12",close:!0,closeOnEscape:!0,progressBarColor:"#B51B1B",progressBar:!0,layout:2,maxWidth:432,maxHeigth:88,animateInside:!0,iconUrl:"./img/x-octagon.svg",transitionIn:"fadeInRight",transitionOut:"fadeOutRight"})}function b(){g.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:5e3,backgroundColor:"#ef4040",messageColor:"#ffffff",messageSize:"12",close:!0,closeOnEscape:!0,progressBarColor:"#B51B1B",progressBar:!0,layout:2,maxWidth:432,maxHeigth:88,animateInside:!0,iconUrl:"./img/x-octagon.svg",transitionIn:"fadeInRight",transitionOut:"fadeOutRight"})}const o={searchForm:document.querySelector(".js-search-form"),waitingText:document.querySelector(".js-waiting-text"),imagesContainer:document.querySelector(".js-images-container"),loadMoreButton:document.querySelector(".js-load-more-btn")},n=new y;o.searchForm.addEventListener("submit",w);o.loadMoreButton.addEventListener("click",x);async function w(s){if(s.preventDefault(),o.waitingText.style.display="block",n.query=s.currentTarget.elements.query.value,n.resetPage(),n.query===""){p(),l(),o.loadMoreButton.style.display="none",u(o.imagesContainer);return}try{const t=await n.fetchImages();o.loadMoreButton.style.display="block",l(),u(o.imagesContainer),m(t,o.imagesContainer),d()}catch{throw o.loadMoreButton.style.display="none",new Error("Failed to fetch images")}o.searchForm.reset()}async function x(s){s.preventDefault(),o.waitingText.style.display="block";try{const t=await n.fetchImages();l(),m(t,o.imagesContainer),d(),window.scrollBy({top:document.querySelector(".gallery-item").getBoundingClientRect().height*2,behavior:"smooth"})}catch{throw new Error("Failed to load more images")}}function l(){o.waitingText.style.display="none"}function d(){new f(".images a",{captionPosition:"bottom",captionDelay:250,captionsData:"alt"}).refresh()}
//# sourceMappingURL=commonHelpers.js.map
