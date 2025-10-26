 const houses = [
      { id:1, title:"Bán nhà mặt tiền Lê Văn Sỹ 4 tầng", price:"15 tỷ", priceNum:15, location:"Quận 3, TP.HCM", area:80, floors:4, bedrooms:4, bathrooms:4, image:"🏠", featured:true, mainroad:true },
      { id:2, title:"Nhà 2 tầng hẻm xe hơi Quận 7", price:"6.5 tỷ", priceNum:6.5, location:"Quận 7, TP.HCM", area:120, floors:2, bedrooms:3, bathrooms:2, image:"🏘️", featured:false, mainroad:false },
      { id:3, title:"Nhà 1 tầng sổ hồng riêng Gò Vấp", price:"2.8 tỷ", priceNum:2.8, location:"Gò Vấp, TP.HCM", area:60, floors:1, bedrooms:2, bathrooms:1, image:"🏡", featured:false, mainroad:false },
      { id:4, title:"Nhà phố kinh doanh Quận 1", price:"28 tỷ", priceNum:28, location:"Quận 1, TP.HCM", area:90, floors:5, bedrooms:6, bathrooms:5, image:"🏬", featured:true, mainroad:true },
      { id:5, title:"Nhà liền kề Novaland", price:"5.2 tỷ", priceNum:5.2, location:"Quận 9, TP.HCM", area:110, floors:3, bedrooms:4, bathrooms:3, image:"🏠", featured:false, mainroad:false },
      { id:6, title:"Nhà ống 3 tầng cho thuê", price:"8.5 tỷ", priceNum:8.5, location:"Bình Thạnh, TP.HCM", area:95, floors:3, bedrooms:3, bathrooms:3, image:"🏠", featured:false, mainroad:false }
    ];

    let current = houses;
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
                <span class="detail-item">🏢 ${l.floors} tầng</span>
                <span class="detail-item">🛏️ ${l.bedrooms} PN</span>
              </p>
              <p class="details">📍 ${l.location}</p>
              <div class="listing-meta">
                <div class="listing-owner"><div class="avatar">${l.title.charAt(0)}</div><span>Chủ tin</span></div>
                <span>Vừa đăng</span>
              </div>
              <div class="buttons">
                <button class="contact" onclick="contact(${l.id})">📞 Liên hệ</button>
                <button class="save" onclick="alert('Tính năng lưu tin')">🤍 Lưu tin</button>
              </div>
            </div>
          </div>`;
      });
      const totalPages = Math.ceil(items.length / perPage) || 1;
      document.getElementById('pageInfo').textContent = `Trang ${page} / ${totalPages}`;
    }

    function contact(id){
      const a = houses.find(x=>x.id===id);
      alert(`${a.title}\n📞 0909xxxxxx\n${a.price}`);
    }

    function searchHouse(e){
      e.preventDefault();
      const kw = document.getElementById('kw').value.trim().toLowerCase();
      const area = document.getElementById('area').value;
      const floors = document.getElementById('floors').value;
      const pr = document.getElementById('priceRange').value;

      filtered = current.filter(h => {
        const mk = !kw || (h.title + ' ' + h.location).toLowerCase().includes(kw);
        const ma = !area || h.location.includes(area);
        const mf = !floors || (floors==='4' ? h.floors>=4 : h.floors==Number(floors));
        let mp = true;
        if (pr) {
          if (pr==='0-2') mp = h.priceNum < 2;
          else if (pr==='2-5') mp = h.priceNum >=2 && h.priceNum <5;
          else if (pr==='5-10') mp = h.priceNum >=5 && h.priceNum <10;
          else if (pr==='10+') mp = h.priceNum >=10;
        }
        return mk && ma && mf && mp;
      });

      page = 1;
      renderPage(filtered);
      document.getElementById('listing-grid').scrollIntoView({behavior:'smooth'});
    }

    function quickHouseFilter(type, el) {
      document.querySelectorAll('.filter-chip').forEach(b=>b.classList.remove('active'));
      el.classList.add('active');
      if (type==='new') filtered = [...current].sort((a,b)=>b.id-a.id);
      else if (type==='cheap') filtered = current.filter(x=>x.priceNum < 5);
      else if (type==='mainroad') filtered = current.filter(x=>x.mainroad);
      else if (type==='featured') filtered = current.filter(x=>x.featured);
      page = 1;
      renderPage(filtered);
    }

    function sortHouse(by) {
      if (by === 'price-low') filtered.sort((a,b)=>a.priceNum - b.priceNum);
      else if (by === 'price-high') filtered.sort((a,b)=>b.priceNum - a.priceNum);
      else if (by === 'area') filtered.sort((a,b)=>b.area - a.area);
      else filtered.sort((a,b)=>a.id - b.id);
      page = 1;
      renderPage(filtered);
    }

    function prevPage(){ if(page>1){ page--; renderPage(filtered); } }
    function nextPage(){ const max = Math.ceil(filtered.length/perPage); if(page<max){ page++; renderPage(filtered); } }

    // init
    filtered = [...current];
    renderPage(filtered);