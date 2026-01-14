# 🌦️ Weather App Project

사용자의 현재 위치를 기반으로 실시간 기상 정보를 제공하고, 즐겨찾는 지역을 관리할 수 있는 반응형 웹 애플리케이션입니다.

---

## 🚀 1. 프로젝트 실행 방법

본 프로젝트는 **pnpm** 패키지 매니저와 **Vite** 빌드 도구를 사용하여 최적의 개발 환경을 구축했습니다.
저장소를 클론하여 실행하려면 공공데이터 포털의 단기예보 서비스 키가 필요합니다.
[단기예보 서비스 링크](https://www.data.go.kr/data/15084084/openapi.do)

### 저장소 클론

```bash
git clone https://github.com/jinoc-git/weather-app
```

### 의존성 설치

```bash
pnpm install
```

### 프로젝트 빌드

```bash
pnpm run build
```

### 프리뷰 모드 실행

```bash
pnpm run preview
```

### 로컬 서버 실행

```bash
pnpm run dev
```


## ✨ 2. 주요 구현 기능

### 📍 실시간 위치 및 기상 리포트

- **위치 감지**: `useLocationStore`를 통해 접속 위치를 자동으로 파악하고 해당 지역의 실시간 기상 데이터를 호출합니다.
- **비주얼 날씨**: 현재 하늘 상태, 강수 형태에 따라 애니메이션이 포함된 시각적 피드백을 제공합니다.

### 🔍 전역 검색 시스템 (Floating UI)

- **데스크탑/모바일 최적화**: 검색 버튼을 우측 하단 플로팅 버튼으로 배치하여 한 손 조작성(Thumb Zone)을 극대화했습니다.
- **성능 최적화**: `useDebounce` 훅을 적용하여 검색 시 불필요한 API 호출을 방지하고 입력 반응성을 높였습니다.

### ⭐ 즐겨찾기 및 사이드바

- **개인화 관리**: 자주 확인하는 지역을 즐겨찾기에 추가하고, 사이드바를 통해 빠르게 접근할 수 있습니다.
- **우측 슬라이딩 인터랙션**: 헤더 우측의 햄버거 메뉴를 통해 나타나는 사이드바에서 즐겨찾기 리스트를 직관적으로 확인합니다.

### 📊 시간별 기상 추이 (Drag Interaction)

- **인터랙티브 차트**: 시간대별 기온과 기상 상태를 `Framer Motion`을 활용한 부드러운 드래그 인터랙션으로 구현했습니다.

## 🛠 3. 기술적 의사 결정 및 이유

### Vite PWA (Progressive Web App) 도입

- **결정 이유**: 네이티브 앱과 유사한 사용자 경험을 제공하고, 서비스 접근성을 보장하기 위해 도입했습니다.

### Feature-Sliced Design (FSD) 아키텍처

- **결정 이유**: 프로젝트 규모 확장에 따른 유지보수 어려움을 해결하기 위해 레이어별 역할 분리가 명확한 FSD를 채택했습니다.

### Tanstack-Query를 이용한 서버 상태 관리

- **결정 이유**: 서버 데이터의 캐싱, 로딩 및 에러 상태의 선언적 관리, 그리고 불필요한 네트워크 요청을 줄이기 위해 도입했습니다.

### Zustand를 이용한 전역 상태 관리

- **결정 이유**: 로컬스토리지 연동, 검색 모달 관리, 위치 정보 등을 Prop Drilling 없이 공유하기 위해 가볍고 직관적인 Zustand를 선택했습니다.

### Axios

- **결정 이유**: 기본 `fetch` API보다 직관적인 인터페이스와 인터셉터(Interceptors) 기능을 통해 에러 핸들링 및 공통 설정을 중앙에서 관리하기 위해 사용했습니다.

### Framer Motion

- **결정 이유**: 복잡한 애니메이션 로직을 UI 코드와 분리하여 선언적으로 관리하기 위해 사용했습니다.

## 🛠 4. 사용 기술 스택

### **Frontend**

- **Core**: React 19, Vite
- **Language**: TypeScript
- **State Management**: Zustand, TanStack Query
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **PWA**: Vite-plugin-PWA
- **Data Processing**: Python (Data Pre-processing)
