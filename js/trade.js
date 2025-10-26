      // dữ liệu
      const listings = [
        { id:1, title:"Bán căn hộ 2PN Vinhomes Grand Park", price:"2.5 tỷ", priceNum:2.5, location:"Quận 9, TP.HCM", area:70, bedrooms:2, bathrooms:2, image:"🏢", type:"buy", category:"apartment", owner:"Anh Tuấn", time:"2 giờ trước", featured:false },
        { id:3, title:"Bán biệt thự Thảo Điền sang trọng", price:"28 tỷ", priceNum:28, location:"Quận 2, TP.HCM", area:250, bedrooms:5, bathrooms:4, image:"🏰", type:"buy", category:"villa", owner:"Anh Hùng", time:"1 ngày trước", featured:true },
        { id:5, title:"Bán đất nền KDC Phú Mỹ Hưng", price:"5.8 tỷ", priceNum:5.8, location:"Quận 7, TP.HCM", area:100, bedrooms:0, bathrooms:0, image:"🌾", type:"buy", category:"land", owner:"Anh Dũng", time:"4 giờ trước", featured:false },
        { id:6, title:"Bán căn hộ 3PN Masteri Thảo Điền", price:"4.2 tỷ", priceNum:4.2, location:"Quận 2, TP.HCM", area:85, bedrooms:3, bathrooms:2, image:"🏢", type:"buy", category:"apartment", owner:"Chị Thảo", time:"6 giờ trước", featured:true },
        { id:8, title:"Bán nhà mặt tiền Lê Văn Sỹ", price:"15 tỷ", priceNum:15, location:"Quận 3, TP.HCM", area:80, bedrooms:4, bathrooms:4, image:"🏠", type:"buy", category:"house", owner:"Chị Hương", time:"1 ngày trước", featured:false },
        // thêm ví dụ
        { id:9, title:"Bán căn hộ 1PN Cityland", price:"1.6 tỷ", priceNum:1.6, location:"Quận Gò Vấp, TP.HCM", area:48, bedrooms:1, bathrooms:1, image:"🏢", type:"buy", category:"apartment", owner:"Anh Khoa", time:"6 giờ trước", featured:false },
        { id:10, title:"Bán nhà 2 tầng Quận 7", price:"6.5 tỷ", priceNum:6.5, location:"Quận 7, TP.HCM", area:120, bedrooms:3, bathrooms:2, image:"🏠", type:"buy", category:"house", owner:"Chị Hoa", time:"2 ngày trước", featured:false }
      ];

      let current = listings.filter(l => l.type === 'buy');
      let filtered = [...current];
      let saved = [];
      let page = 1;
      const perPage = 6;

      function renderPage(items) {
        const grid = document.getElementById('listing-grid');
        grid.innerHTML = '';
        if (!items.length) {
          grid.innerHTML = '<p style="text-align:center; padding:2rem; color:#666;">Không tìm thấy sản phẩm.</p>';
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
                <div class="listing-badge buy">Bán</div>
                ${l.featured ? '<div class="listing-featured">⭐ Nổi bật</div>' : ''}
              </div>
              <div class="content">
                <h3>${l.title}</h3>
                <p class="price">${l.price}</p>
                <p class="details">
                  <span class="detail-item">📐 ${l.area}m²</span>
                  ${l.bedrooms ? `<span class="detail-item">🛏️ ${l.bedrooms} PN</span>` : ''}
                  ${l.bathrooms ? `<span class="detail-item">🚿 ${l.bathrooms} WC</span>` : ''}
                </p>
                <p class="details">📍 ${l.location}</p>
                <div class="listing-meta">
                  <div class="listing-owner">
                    <div class="avatar">${l.owner.charAt(l.owner.length-1)}</div>
                    <span>${l.owner}</span>
                  </div>
                  <span>${l.time}</span>
                </div>
                <div class="buttons">
                  <button class="contact" onclick="contact(${l.id})">📞 Liên hệ</button>
                  <button class="save ${isSaved ? 'saved' : ''}" onclick="toggleSave(${l.id})">${isSaved ? '❤️ Đã lưu' : '🤍 Lưu tin'}</button>
                </div>
              </div>
            </div>
          `;
          grid.innerHTML += card;
        });
        const totalPages = Math.ceil(items.length / perPage) || 1;
        document.getElementById('pageInfo').textContent = `Trang ${page} / ${totalPages}`;
      }

      function contact(id) {
        const l = listings.find(x=>x.id===id);
        alert(`Liên hệ: 0909 ${Math.floor(Math.random()*900000+100000)}\n${l.title}\n${l.price}`);
      }

      function toggleSave(id) {
        const idx = saved.indexOf(id);
        if (idx>-1) saved.splice(idx,1); else saved.push(id);
        renderPage(filtered);
      }

      function searchBuy(e) {
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
            if (pr === '0-2') mp = l.priceNum < 2;
            else if (pr === '2-5') mp = l.priceNum >=2 && l.priceNum <5;
            else if (pr === '5-10') mp = l.priceNum >=5 && l.priceNum <10;
            else if (pr === '10+') mp = l.priceNum >=10;
          }
          return mk && ma && mt && mp;
        });
        page = 1;
        renderPage(filtered);
        document.getElementById('listing-grid').scrollIntoView({behavior:'smooth'});
      }

      function quickFilter(type, el) {
        el.classList.toggle('active');
        if (type === 'new') filtered = [...current].sort((a,b)=>b.id-a.id).slice(0,8);
        else if (type === 'cheap') filtered = current.filter(x=>x.priceNum>0 && x.priceNum <5);
        else if (type === 'luxury') filtered = current.filter(x=>x.priceNum >=10);
        else if (type === 'featured') filtered = current.filter(x=>x.featured);
        else filtered = [...current];
        page = 1;
        renderPage(filtered);
      }

      function sortBuy(by) {
        if (by === 'price-low') filtered.sort((a,b)=>a.priceNum - b.priceNum);
        else if (by === 'price-high') filtered.sort((a,b)=>b.priceNum - a.priceNum);
        else if (by === 'area') filtered.sort((a,b)=>b.area - a.area);
        else filtered.sort((a,b)=>a.id - b.id);
        page = 1;
        renderPage(filtered);
      }

      function prevPage(){ if(page>1){ page--; renderPage(filtered);} }
      function nextPage(){ const max = Math.ceil(filtered.length/perPage); if(page<max){ page++; renderPage(filtered);} }

      // khởi tạo
      filtered = [...current];
      renderPage(filtered);