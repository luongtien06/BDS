const villas = [
      { id:1, title:"Biệt thự Thảo Điền có hồ bơi", price:"28 tỷ", priceNum:28, location:"Quận 2, TP.HCM", area:300, bedrooms:5, bathrooms:4, image:"🏰", featured:true, pool:true, garden:true },
      { id:2, title:"Villa sân vườn Quận 7", price:"45 tỷ", priceNum:45, location:"Quận 7, TP.HCM", area:520, bedrooms:6, bathrooms:6, image:"🏡", featured:false, pool:true, garden:true },
      { id:3, title:"Biệt thự mini ven sông", price:"18 tỷ", priceNum:18, location:"Quận 9, TP.HCM", area:240, bedrooms:4, bathrooms:3, image:"🏰", featured:false, pool:false, garden:true },
      { id:4, title:"Villa nghỉ dưỡng Vũng Tàu", price:"55 tỷ", priceNum:55, location:"Vũng Tàu", area:800, bedrooms:8, bathrooms:8, image:"🏝️", featured:true, pool:true, garden:true },
      { id:5, title:"Biệt thự phố hiện đại", price:"22 tỷ", priceNum:22, location:"Quận 3, TP.HCM", area:260, bedrooms:4, bathrooms:4, image:"🏰", featured:false, pool:false, garden:false },
      { id:6, title:"Villa hợp đồng đầu tư", price:"12.5 tỷ", priceNum:12.5, location:"Hà Nội", area:200, bedrooms:4, bathrooms:3, image:"🏡", featured:false, pool:false, garden:true }
    ];

    let current = villas;
    let filtered = [...current];
    let page = 1;
    const perPage = 6;

    function renderPage(items) {
      const grid = document.getElementById('listing-grid');
      grid.innerHTML = '';
      if (!items.length) {
        grid.innerHTML = '<p style="text-align:center; padding:2rem; color:#666;">Không tìm thấy kết quả.</p>';
        document.getElementById('pageInfo').textContent = '';
        return;
      }
      const start = (page-1)*perPage;
      const pageItems = items.slice(start, start+perPage);
      pageItems.forEach(v => {
        grid.innerHTML += `
          <div class="listing-card">
            <div class="listing-image">
              ${v.image}
              <div class="listing-badge buy">Bán</div>
              ${v.featured ? '<div class="listing-featured">⭐ Nổi bật</div>' : ''}
            </div>
            <div class="content">
              <h3>${v.title}</h3>
              <p class="price">${v.price}</p>
              <p class="details">
                <span class="detail-item">📐 ${v.area}m²</span>
                <span class="detail-item">🛏️ ${v.bedrooms} PN</span>
                <span class="detail-item">🚿 ${v.bathrooms} WC</span>
                ${v.pool ? '<span class="detail-item">🏊 Hồ bơi</span>' : ''}
                ${v.garden ? '<span class="detail-item">🌳 Sân vườn</span>' : ''}
              </p>
              <p class="details">📍 ${v.location}</p>
              <div class="listing-meta">
                <div class="listing-owner"><div class="avatar">${v.title.charAt(0)}</div><span>Chủ tin</span></div>
                <span>Vừa đăng</span>
              </div>
              <div class="buttons">
                <button class="contact" onclick="contact(${v.id})">📞 Liên hệ</button>
                <button class="save" onclick="alert('Tính năng lưu tin')">🤍 Lưu tin</button>
              </div>
            </div>
          </div>`;
      });
      const totalPages = Math.ceil(items.length / perPage) || 1;
      document.getElementById('pageInfo').textContent = `Trang ${page} / ${totalPages}`;
    }

    function contact(id){
      const v = villas.find(x=>x.id===id);
      alert(`${v.title}\n📞 0909 xxxx xxx\n${v.price}`);
    }

    function searchVilla(e){
      e.preventDefault();
      const kw = document.getElementById('kw').value.trim().toLowerCase();
      const area = document.getElementById('area').value;
      const size = document.getElementById('size').value;
      const pr = document.getElementById('priceRange').value;

      filtered = current.filter(v => {
        const mk = !kw || (v.title + ' ' + v.location).toLowerCase().includes(kw);
        const ma = !area || v.location.includes(area);
        let ms = true;
        if (size) {
          if (size === '0-100') ms = v.area < 100;
          else if (size === '100-250') ms = v.area >=100 && v.area <250;
          else if (size === '250-500') ms = v.area >=250 && v.area <500;
          else if (size === '500+') ms = v.area >=500;
        }
        let mp = true;
        if (pr) {
          if (pr === '0-5') mp = v.priceNum < 5;
          else if (pr === '5-15') mp = v.priceNum >=5 && v.priceNum <15;
          else if (pr === '15-50') mp = v.priceNum >=15 && v.priceNum <50;
          else if (pr === '50+') mp = v.priceNum >=50;
        }
        return mk && ma && ms && mp;
      });

      page = 1;
      renderPage(filtered);
      document.getElementById('listing-grid').scrollIntoView({behavior:'smooth'});
    }

    function quickVillaFilter(type, el){
      document.querySelectorAll('.filter-chip').forEach(b=>b.classList.remove('active'));
      el.classList.add('active');
      if (type === 'new') filtered = [...current].sort((a,b)=>b.id-a.id);
      else if (type === 'garden') filtered = current.filter(x=>x.garden);
      else if (type === 'pool') filtered = current.filter(x=>x.pool);
      else if (type === 'featured') filtered = current.filter(x=>x.featured);
      page = 1;
      renderPage(filtered);
    }

    function sortVilla(by){
      if (by === 'price-low') filtered.sort((a,b)=>a.priceNum - b.priceNum);
      else if (by === 'price-high') filtered.sort((a,b)=>b.priceNum - a.priceNum);
      else if (by === 'area') filtered.sort((a,b)=>b.area - a.area);
      else filtered.sort((a,b)=>a.id - b.id);
      page = 1;
      renderPage(filtered);
    }

    function prevPage(){ if(page>1){ page--; renderPage(filtered);} }
    function nextPage(){ const max = Math.ceil(filtered.length/perPage); if(page<max){ page++; renderPage(filtered);} }

    // init
    filtered = [...current];
    renderPage(filtered);