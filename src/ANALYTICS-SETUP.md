# 📊 **GOOGLE ANALYTICS 4 - CONFIGURAÇÃO COMPLETA**

## ✅ **STATUS ATUAL**

### **O QUE JÁ ESTÁ ATIVO:**
- ✅ Google Analytics 4 instalado (`G-D6X8BXE242`)
- ✅ Tracking de conversões (formulário de contacto)
- ✅ Tracking de WhatsApp clicks
- ✅ Scroll depth tracking (25%, 50%, 75%, 100%)
- ✅ Outbound link tracking
- ✅ Utilitários de tracking (`/utils/gtag.ts`)

---

## 🎯 **EVENTOS JÁ CONFIGURADOS**

### **1. CONVERSÕES PRINCIPAIS**
```typescript
✅ form_submission - Quando formulário é enviado
✅ conversion - Marcado como lead qualificado
✅ whatsapp_click - Click no botão WhatsApp
```

### **2. ENGAGEMENT**
```typescript
✅ scroll_depth - Profundidade de scroll (25/50/75/100%)
✅ external_link_click - Clicks em links externos
```

---

## 📊 **COMO VER OS DADOS**

### **1. ENTRAR NO GOOGLE ANALYTICS:**
1. Vai a [analytics.google.com](https://analytics.google.com)
2. Seleciona a propriedade **"Strict.Dev"**

### **2. RELATÓRIOS PRINCIPAIS:**

#### **A) TRÁFEGO EM TEMPO REAL:**
- Menu: `Relatórios → Tempo real`
- Vês: Visitantes ativos, páginas vistas, eventos

#### **B) CONVERSÕES:**
- Menu: `Relatórios → Engagement → Conversões`
- Vês: Formulários enviados, WhatsApp clicks

#### **C) ORIGENS DE TRÁFEGO:**
- Menu: `Relatórios → Aquisição → Visão geral`
- Vês: Google, direto, redes sociais, referências

#### **D) COMPORTAMENTO:**
- Menu: `Relatórios → Engagement → Páginas e telas`
- Vês: Páginas mais visitadas, tempo médio

---

## 🔧 **CONFIGURAR CONVERSÕES PERSONALIZADAS**

### **PASSO 1: Marcar evento como conversão**
1. No GA4, vai a: `Configurar → Eventos`
2. Encontra os eventos:
   - `form_submission`
   - `conversion`
   - `whatsapp_click`
3. Toggle "Marcar como conversão" = ON

### **PASSO 2: Criar funil de conversão**
1. Menu: `Explorar → Análise de funil`
2. Adiciona etapas:
   ```
   Etapa 1: page_view (Hero)
   Etapa 2: scroll_depth (50%)
   Etapa 3: cta_click
   Etapa 4: form_submission
   ```

---

## 📈 **MÉTRICAS IMPORTANTES A MONITORIZAR**

### **DIARIAMENTE:**
- 📊 Visitantes únicos
- 📧 Formulários enviados
- 📱 WhatsApp clicks
- 🌍 Países de origem

### **SEMANALMENTE:**
- 📈 Taxa de conversão (formulários / visitantes)
- ⏱️ Tempo médio no site
- 📄 Páginas por sessão
- 🚪 Taxa de rejeição

### **MENSALMENTE:**
- 🎯 Objetivos alcançados
- 📊 Comparação mês anterior
- 🔍 Fontes de tráfego mais valiosas
- 💰 Custo por lead (se tiveres ads)

---

## 🎯 **METAS RECOMENDADAS**

### **OBJETIVO 1: Taxa de Conversão**
```
Meta: 3% dos visitantes preenchem formulário
Como calcular: (Formulários enviados / Visitantes) × 100
```

### **OBJETIVO 2: Engagement**
```
Meta: Tempo médio > 2 minutos
Indica: Conteúdo interessante
```

### **OBJETIVO 3: Scroll Depth**
```
Meta: 60% dos users chegam a 75% da página
Indica: Conteúdo relevante até ao fim
```

---

## 🚀 **PRÓXIMOS PASSOS (OPCIONAL)**

### **1. MICROSOFT CLARITY (Heatmaps)**
```bash
# Ainda não instalado
# Benefícios: Session recordings + heatmaps GRÁTIS
```

### **2. GOOGLE SEARCH CONSOLE**
```bash
# Ligar ao GA4 para ver:
# - Queries de pesquisa
# - Posição média no Google
# - CTR nos resultados
```

### **3. GOOGLE ADS CONVERSION TRACKING**
```bash
# Se começares a fazer ads:
# - Import conversões do GA4
# - Medir ROI de campanhas
```

---

## 💡 **DICAS PRO**

### **1. CRIAR ALERTAS PERSONALIZADOS:**
Menu: `Admin → Alertas personalizados`
```
✅ Alerta se conversões caírem > 50%
✅ Alerta se tráfego subir > 200% (pico viral!)
✅ Alerta se taxa rejeição > 80%
```

### **2. CRIAR SEGMENTOS:**
```
✅ Users que converteram
✅ Users de Portugal vs Brasil
✅ Mobile vs Desktop
✅ First-time vs Returning
```

### **3. CONFIGURAR OBJETIVOS DE VALOR:**
```typescript
// Dar valor monetário às conversões
form_submission: €50 (valor estimado de um lead)
whatsapp_click: €30 (valor de um contacto qualificado)
```

---

## 🔒 **PRIVACIDADE & GDPR**

### **JÁ CONFIGURADO:**
- ✅ `anonymize_ip: true` - IPs anonimizados
- ✅ Cookie consent via Cookie Banner
- ✅ `SameSite=None;Secure` cookies

### **PRÓXIMO PASSO:**
Adicionar política de privacidade que menciona:
- Google Analytics
- Cookies usados
- Direito de opt-out

---

## 📱 **TRACKING MOBILE vs DESKTOP**

O GA4 automaticamente separa:
- 📱 Mobile users
- 💻 Desktop users
- 📲 Tablet users

**Ver em:** `Relatórios → Tecnologia → Visão geral`

---

## 🎓 **RECURSOS ÚTEIS**

### **TUTORIAIS GOOGLE:**
- [GA4 para iniciantes](https://skillshop.exceedlms.com/student/path/508845-google-analytics-4)
- [Certificação GA4](https://skillshop.exceedlms.com/student/catalog)

### **DASHBOARD RECOMENDADO:**
1. Visitantes únicos (hoje vs ontem)
2. Conversões (hoje vs ontem)
3. Top 5 páginas
4. Top 5 fontes de tráfego
5. Taxa de conversão

---

## ❓ **FAQ**

### **P: Quanto tempo até ver dados?**
R: 24-48 horas para dados completos. Tempo real já funciona.

### **P: Como sei se está a funcionar?**
R: Visita o site e vê em "Tempo real" se apareces.

### **P: Posso ver quem visitou especificamente?**
R: Não. GA4 é anónimo (GDPR compliant).

### **P: Como exportar relatórios?**
R: No canto superior direito → "Partilhar" → "Download"

---

## 🔥 **CHECKLIST PÓS-INSTALAÇÃO**

- [ ] Verificar em "Tempo real" que eventos aparecem
- [ ] Marcar `form_submission` como conversão
- [ ] Criar alerta de queda de conversões
- [ ] Ligar Google Search Console
- [ ] Criar relatório mensal automático
- [ ] Configurar objetivos de valor (€)
- [ ] Instalar Microsoft Clarity (complementar)

---

## 📧 **SUPORTE**

**Problemas com GA4?**
- [Centro de Ajuda GA4](https://support.google.com/analytics)
- [Comunidade GA4](https://support.google.com/analytics/community)

**Verificar instalação:**
```javascript
// Console do browser (F12)
console.log(window.dataLayer);
// Deve mostrar array com eventos
```

---

✅ **TUDO PRONTO! O teu GA4 está 100% funcional.**

Agora é só esperar 24h e começar a ver os dados chegarem! 🚀
