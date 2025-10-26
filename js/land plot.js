const lands = [
      { id:1, title:"Bán đất thổ cư Quận 9 - 100m²", price:"5.8 tỷ", priceNum:5.8, location:"Quận 9, TP.HCM", area:100, type:"thocu", sodo:true, mainroad:false, project:false, image:"🌾", featured:false },
      { id:2, title:"Đất nền dự án Vạn Phúc - 120m²", price:"3.2 tỷ", priceNum:3.2, location:"Quận 7, TP.HCM", area:120, type:"duan", sodo:false, mainroad:false, project:true, image:"🏗️", featured:true },
      { id:3, title:"Bán lô mặt tiền đường lớn 200m²", price:"18 tỷ", priceNum:18, location:"Quận 3, TP.HCM", area:200, type:"thocu", sodo:true, mainroad:true, project:false, image:"🛣️", featured:true },
      { id:4, title:"Đất vườn ngoại thành 300m²", price:"1.8 tỷ", priceNum:1.8, location:"Hóc Môn, TP.HCM", area:300, type:"nongnghiep", sodo:false, mainroad:false, project:false, image:"🌳", featured:false },
      { id:5, title:"Lô đất 50m² tiện đầu tư", price:"0.9 tỷ", priceNum:0.9, location:"Gò Vấp, TP.HCM", area:50, type:"thocu", sodo:false, mainroad:false, project:false, image:"🏡", featured:false },
      { id:6, title:"Đất dự án ven sông 400m²", price:"25 tỷ", priceNum:25, location:"Vũng Tàu", area:400, type:"duan", sodo:false, mainroad:false, project:true, image:"🏝️", featured:true }
    ];

    let current = lands;
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
                <span class="detail-item">📍 ${l.location.split(',')[0]}</span>
                ${l.sodo ? '<span class="detail-item">📜 Sổ đỏ</span>' : ''}
                ${l.mainroad ? '<span class="detail-item">🛣️ Mặt tiền</span>' : ''}
                ${l.project ? '<span class="detail-item">🏗️ Dự án</span>' : ''}
              </p>
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
      const a = lands.find(x=>x.id===id);
      alert(`${a.title}\n📞 0909xxxxxx\n${a.price}`);
    }

    function searchLand(e){
      e.preventDefault();
      const kw = document.getElementById('kw').value.trim().toLowerCase();
      const area = document.getElementById('area').value;
      const size = document.getElementById('size').value;
      const pr = document.getElementById('priceRange').value;

      filtered = current.filter(l => {
        const mk = !kw || (l.title + ' ' + l.location).toLowerCase().includes(kw);
        const ma = !area || l.location.includes(area);
        let ms = true;
        if (size) {
          if (size === '0-50') ms = l.area < 50;
          else if (size === '50-100') ms = l.area >=50 && l.area <100;
          else if (size === '100-300') ms = l.area >=100 && l.area <300;
          else if (size === '300+') ms = l.area >=300;
        }
        let mp = true;
        if (pr) {
          if (pr === '0-1') mp = l.priceNum < 1;
          else if (pr === '1-3') mp = l.priceNum >=1 && l.priceNum <3;
          else if (pr === '3-10') mp = l.priceNum >=3 && l.priceNum <10;
          else if (pr === '10+') mp = l.priceNum >=10;
        }
        return mk && ma && ms && mp;
      });

      page = 1;
      renderPage(filtered);
      document.getElementById('listing-grid').scrollIntoView({behavior:'smooth'});
    }

    function quickLandFilter(type, el){
      document.querySelectorAll('.filter-chip').forEach(b=>b.classList.remove('active'));
      el.classList.add('active');
      if (type === 'new') filtered = [...current].sort((a,b)=>b.id-a.id);
      else if (type === 'sodo') filtered = current.filter(x=>x.sodo);
      else if (type === 'mainroad') filtered = current.filter(x=>x.mainroad);
      else if (type === 'project') filtered = current.filter(x=>x.project);
      page = 1;
      renderPage(filtered);
    }

    function sortLand(by){
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