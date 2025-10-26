// Dữ liệu mẫu cho thuê
    const listings = [
      { id:1, title:"Cho thuê căn hộ 2PN Vinhomes Central Park", price:"15 triệu/tháng", priceNum:15, location:"Bình Thạnh, TP.HCM", area:70, bedrooms:2, bathrooms:2, image:"🏢", type:"rent", category:"apartment", owner:"Chị Lan", time:"1 giờ trước", featured:true, furniture:true },
      { id:2, title:"Cho thuê văn phòng hạng A Bitexco", price:"40 triệu/tháng", priceNum:40, location:"Quận 1, TP.HCM", area:150, bedrooms:0, bathrooms:2, image:"🏢", type:"rent", category:"office", owner:"Anh Hải", time:"2 giờ trước", featured:true, furniture:false },
      { id:3, title:"Cho thuê nhà nguyên căn Thảo Điền", price:"25 triệu/tháng", priceNum:25, location:"Quận 2, TP.HCM", area:200, bedrooms:4, bathrooms:3, image:"🏠", type:"rent", category:"house", owner:"Anh Tùng", time:"3 giờ trước", featured:false, furniture:true },
      { id:4, title:"Cho thuê mặt bằng kinh doanh", price:"35 triệu/tháng", priceNum:35, location:"Quận 3, TP.HCM", area:80, bedrooms:0, bathrooms:1, image:"🏪", type:"rent", category:"store", owner:"Chị Hương", time:"5 giờ trước", featured:false, furniture:false },
      { id:5, title:"Cho thuê căn hộ studio Masteri", price:"8 triệu/tháng", priceNum:8, location:"Quận 2, TP.HCM", area:35, bedrooms:1, bathrooms:1, image:"🏢", type:"rent", category:"apartment", owner:"Anh Khoa", time:"6 giờ trước", featured:false, furniture:true },
      { id:6, title:"Cho thuê biệt thự nghỉ dưỡng", price:"50 triệu/tháng", priceNum:50, location:"Quận 7, TP.HCM", area:300, bedrooms:5, bathrooms:5, image:"🏰", type:"rent", category:"villa", owner:"Chị Thảo", time:"1 ngày trước", featured:true, furniture:true }
    ];

    let current = listings;
    let filtered = [...current];
    let saved = [];
    let page = 1;
    const perPage = 6;

    // Render listing function
    function renderPage(items) {
      const grid = document.getElementById('listing-grid');
      grid.innerHTML = '';
      if (!items.length) {
        grid.innerHTML = '<p style="text-align:center; padding:2rem; color:#666;">Không tìm thấy kết quả phù hợp.</p>';
        document.getElementById('pageInfo').textContent = '';
        return;
      }
      const start = (page-1)*perPage;
      const pageItems = items.slice(start, start+perPage);
      pageItems.forEach(l => {
        const isSaved = saved.includes(l.id);
        const card = `
          <div class="listing-card">
            <div class="listing-image">
              ${l.image}
              <div class="listing-badge rent">Cho thuê</div>
              ${l.featured ? '<div class="listing-featured">⭐ Nổi bật</div>' : ''}
            </div>
            <div class="content">
              <h3>${l.title}</h3>
              <p class="price">${l.price}</p>
              <p class="details">
                <span class="detail-item">📐 ${l.area}m²</span>
                ${l.bedrooms ? `<span class="detail-item">🛏️ ${l.bedrooms} PN</span>` : ''}
                ${l.bathrooms ? `<span class="detail-item">🚿 ${l.bathrooms} WC</span>` : ''}
                ${l.furniture ? '<span class="detail-item">🛋️ Full nội thất</span>' : ''}
              </p>
              <p class="details">📍 ${l.location}</p>
              <div class="listing-meta">
                <div class="listing-owner">
                  <div class="avatar">${l.owner.charAt(0)}</div>
                  <span>${l.owner}</span>
                </div>
                <span>${l.time}</span>
              </div>
              <div class="buttons">
                <button class="contact" onclick="contact(${l.id})">📞 Liên hệ</button>
                <button>Xem chi tiết</button>
              </div>
            </div>
          </div>`;
        grid.innerHTML += card;
      });
      const totalPages = Math.ceil(items.length / perPage) || 1;
      document.getElementById('pageInfo').textContent = `Trang ${page} / ${totalPages}`;
    }

    // Search function
    function searchRent(e) {
      e.preventDefault();
      const kb = document.getElementById('kb').value.trim().toLowerCase();
      const area = document.getElementById('area').value;
      const ptype = document.getElementById('ptype').value;
      const pr = document.getElementById('prange').value;

      filtered = current.filter(l => {
        const mk = !kb || (l.title + ' ' + l.location).toLowerCase().includes(kb);
        const ma = !area || l.location.includes(area);
        const mt = !ptype || l.category === ptype;
        let mp = true;
        if (pr) {
          if (pr === '0-5') mp = l.priceNum < 5;
          else if (pr === '5-10') mp = l.priceNum >= 5 && l.priceNum < 10;
          else if (pr === '10-20') mp = l.priceNum >= 10 && l.priceNum < 20;
          else if (pr === '20+') mp = l.priceNum >= 20;
        }
        return mk && ma && mt && mp;
      });
      page = 1;
      renderPage(filtered);
      document.getElementById('listing-grid').scrollIntoView({behavior:'smooth'});
    }

    // Quick filter function
    function quickFilter(type, el) {
      document.querySelectorAll('.filter-chip').forEach(btn => btn.classList.remove('active'));
      el.classList.add('active');
      if (type === 'new') filtered = [...current].sort((a,b)=>b.id-a.id);
      else if (type === 'cheap') filtered = current.filter(x=>x.priceNum < 10);
      else if (type === 'furniture') filtered = current.filter(x=>x.furniture);
      else if (type === 'featured') filtered = current.filter(x=>x.featured);
      else filtered = [...current];
      page = 1;
      renderPage(filtered);
    }

    // Sort function
    function sortRent(by) {
      if (by === 'price-low') filtered.sort((a,b)=>a.priceNum - b.priceNum);
      else if (by === 'price-high') filtered.sort((a,b)=>b.priceNum - a.priceNum);
      else if (by === 'area') filtered.sort((a,b)=>b.area - a.area);
      else filtered.sort((a,b)=>b.id - a.id);
      renderPage(filtered);
    }

    // Contact function
    function contact(id) {
      const l = listings.find(x=>x.id===id);
      alert(`Liên hệ: ${l.owner}\nSĐT: 0909 ${Math.floor(Math.random()*900000+100000)}\n${l.title}\n${l.price}`);
    }

    // Save listing function
    function toggleSave(id) {
      const idx = saved.indexOf(id);
      if (idx > -1) saved.splice(idx,1);
      else saved.push(id);
      renderPage(filtered);
    }

    // Pagination
    function prevPage(){ if(page>1){ page--; renderPage(filtered);} }
    function nextPage(){ const max = Math.ceil(filtered.length/perPage); if(page<max){ page++; renderPage(filtered);} }

    // Initialize page
    renderPage(filtered);