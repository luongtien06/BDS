const apartments = [
        { id:1, title:"Bán căn 2PN Vinhomes Grand Park", price:"2.5 tỷ", priceNum:2.5, location:"Quận 9, TP.HCM", area:72, bedrooms:2, bathrooms:2, image:"🏢", featured:true },
        { id:2, title:"Bán căn 3PN Masteri Thảo Điền", price:"4.2 tỷ", priceNum:4.2, location:"Quận 2, TP.HCM", area:88, bedrooms:3, bathrooms:2, image:"🏢", featured:false },
        { id:3, title:"Bán studio Cityland", price:"1.6 tỷ", priceNum:1.6, location:"Gò Vấp, TP.HCM", area:36, bedrooms:1, bathrooms:1, image:"🏢", featured:false },
        { id:4, title:"Penthouse cao cấp Quận 1", price:"18 tỷ", priceNum:18, location:"Quận 1, TP.HCM", area:180, bedrooms:4, bathrooms:4, image:"🏙️", featured:true },
        { id:5, title:"Căn hộ 2PN Novaland", price:"3.1 tỷ", priceNum:3.1, location:"Quận 7, TP.HCM", area:75, bedrooms:2, bathrooms:2, image:"🏢", featured:false },
        { id:6, title:"Căn hộ 1PN cho đầu tư", price:"1.9 tỷ", priceNum:1.9, location:"Hà Nội", area:45, bedrooms:1, bathrooms:1, image:"🏢", featured:false }
      ];

      let current = apartments;
      let filtered = [...current];
      let page = 1;
      const perPage = 6;

      function renderPage(items) {
        const grid = document.getElementById('listing-grid');
        grid.innerHTML = '';
        if (!items.length) {
          grid.innerHTML = '<p style="text-align:center; padding:2rem; color:#666;">Không tìm thấy căn hộ.</p>';
          document.getElementById('pageInfo').textContent = '';
          return;
        }
        const start = (page-1)*perPage;
        const pageItems = items.slice(start, start+perPage);
        pageItems.forEach(l => {
          grid.innerHTML += `
            <div class="listing-card">
              <div class="listing-image">
                ${l.image}
                <div class="listing-badge buy">Bán</div>
                ${l.featured ? '<div class="listing-featured">⭐ Nổi bật</div>' : ''}
              </div>
              <div class="content">
                <h3>${l.title}</h3>
                <p class="price">${l.price}</p>
                <p class="details">
                  <span class="detail-item">📐 ${l.area}m²</span>
                  <span class="detail-item">🛏️ ${l.bedrooms} PN</span>
                  <span class="detail-item">🚿 ${l.bathrooms} WC</span>
                </p>
                <p class="details">📍 ${l.location}</p>
                <div class="listing-meta">
                  <div class="listing-owner"><div class="avatar">${l.title.charAt(0)}</div><span>Chủ tin</span></div>
                  <span>Vừa đăng</span>
                </div>
                <div class="buttons">
                  <button class="contact" onclick="contact(${l.id})">📞 Liên hệ</button>
                  <button>Xem chi tiết</button>
                </div>
              </div>
            </div>`;
        });
        const totalPages = Math.ceil(items.length / perPage) || 1;
        document.getElementById('pageInfo').textContent = `Trang ${page} / ${totalPages}`;
      }

      function contact(id){
        const a = apartments.find(x=>x.id===id);
        alert(`${a.title}\n📞 0909xxxxxx\n${a.price}`);
      }

      function searchApt(e){
        e.preventDefault();
        const kw = document.getElementById('kw').value.trim().toLowerCase();
        const area = document.getElementById('area').value;
        const beds = document.getElementById('beds').value;
        const pr = document.getElementById('priceRange').value;
        filtered = current.filter(a => {
          const mk = !kw || (a.title+' '+a.location).toLowerCase().includes(kw);
          const ma = !area || a.location.includes(area);
          const mb = !beds || (beds==='4' ? a.bedrooms>=4 : a.bedrooms==Number(beds));
          let mp = true;
          if (pr) {
            if (pr==='0-2') mp = a.priceNum < 2;
            else if (pr==='2-5') mp = a.priceNum >=2 && a.priceNum <5;
            else if (pr==='5-10') mp = a.priceNum >=5 && a.priceNum <10;
            else if (pr==='10+') mp = a.priceNum >=10;
          }
          return mk && ma && mb && mp;
        });
        page = 1;
        renderPage(filtered);
      }

      function quickAptFilter(type, el){
        document.querySelectorAll('.filter-chip').forEach(b=>b.classList.remove('active'));
        el.classList.add('active');
        if (type==='new') filtered = [...current].sort((a,b)=>b.id-a.id);
        else if (type==='cheap') filtered = current.filter(x=>x.priceNum<3);
        else if (type==='luxury') filtered = current.filter(x=>x.priceNum>=10);
        else if (type==='featured') filtered = current.filter(x=>x.featured);
        page = 1;
        renderPage(filtered);
      }

      function sortApt(by){
        if (by==='price-low') filtered.sort((a,b)=>a.priceNum-b.priceNum);
        else if (by==='price-high') filtered.sort((a,b)=>b.priceNum-a.priceNum);
        else if (by==='area') filtered.sort((a,b)=>b.area-a.area);
        else filtered.sort((a,b)=>a.id-b.id);
        page = 1;
        renderPage(filtered);
      }

      function prevPage(){ if(page>1){ page--; renderPage(filtered); } }
      function nextPage(){ const max = Math.ceil(filtered.length/perPage); if(page<max){ page++; renderPage(filtered); } }

      // init
      filtered = [...current];
      renderPage(filtered);