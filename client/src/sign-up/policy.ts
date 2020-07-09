const agreeAll = document.getElementById(
  'agree-all-checkbox'
) as HTMLInputElement
const agreeEssential = document.getElementById(
  'agree-essential-checkbox'
) as HTMLInputElement
const agreeAd = document.getElementById('agree-ad-checkbox') as HTMLInputElement

function handleSubChange() {
  if (agreeEssential.checked && agreeAd.checked) {
    agreeAll.checked = true
    return
  }

  agreeAll.checked = false
}

agreeAll.addEventListener('change', (e) => {
  if ((e.target as HTMLInputElement).checked) {
    agreeEssential.checked = true
    agreeAd.checked = true
    return
  }

  agreeEssential.checked = false
  agreeAd.checked = false
})

agreeEssential.addEventListener('change', handleSubChange)
agreeAd.addEventListener('change', handleSubChange)

export const isEssentialAgreed = () => agreeEssential.checked
